import { FunctionReturn, FunctionOptions, toResult, ChainId } from '@heyanon/sdk';
import { BaseProps, COMPOUND_TOKEN_DECIMALS, getTokenPrice, getUserMarketInteractionsSum, MarketBaseAssets, validateInputAndGetData } from '../constants';
import { erc20Abi } from '../abis/erc20Abi';
import { rewardsAbi } from '../abis';

interface Props extends BaseProps { }

/**
 * Gets the total earnings for a user in a Compound V3 market, including both trading profits and rewards
 * @param props Base properties including chain name, user account, and token address
 * @param options Function options containing provider getter
 * @returns Total earnings in USD, broken down into trading profits and rewards claimed
 */
export async function getTotalEarn({ chainName, account, tokenAddress }: Props, { getProvider }: FunctionOptions): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;

    const cometAddress = marketConfig.cometAddress;

    try {
        const provider = getProvider(chainId);
        const userBalance = await provider.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [account],
        });
        const {
            collateralSupplySum,
            collateralWithdrawSum,
            supplySum,
            withdrawSum,
        } = await getUserMarketInteractionsSum(account, tokenAddress, provider);
        const profit = userBalance - (
            collateralSupplySum ||
            (0n - supplySum - collateralWithdrawSum + withdrawSum)
        );
        const decimal = marketConfig.baseAssetDecimals;
        const price = await getTokenPrice(chainId, marketConfig.baseAsset, provider);
        const profitInUSD = profit * price / 10n ** BigInt(decimal);
        const claimedRewards = await provider.readContract({
            address: marketConfig.rewardsAddress,
            abi: rewardsAbi,
            functionName: 'rewardsClaimed',
            args: [cometAddress, account],
        });
        const rewardOwed = await provider.multicall({
            contracts: [
                {
                    address: marketConfig.rewardsAddress,
                    abi: rewardsAbi,
                    functionName: 'getRewardOwed',
                    args: [cometAddress, account],
                },
            ],
        });
        // rewards claimed in Compound Token
        const compoundTokenPrice = await getTokenPrice(ChainId.ETHEREUM, MarketBaseAssets.COMP, provider);
        const rewardsInCompoundToken = claimedRewards + (rewardOwed[0]?.result?.owed ?? 0n) * compoundTokenPrice / 10n ** BigInt(COMPOUND_TOKEN_DECIMALS);

        return toResult(`Total Earn: ${rewardsInCompoundToken + profitInUSD}. ${profitInUSD} from profit, ${rewardsInCompoundToken} from rewards`);
    } catch (error) {
        return toResult(`Failed to get borrow APR for ${marketConfig.name}`, true);
    }
}