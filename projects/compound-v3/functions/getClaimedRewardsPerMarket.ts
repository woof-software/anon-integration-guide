import { FunctionReturn, FunctionOptions, toResult } from '@heyanon/sdk';
import { BaseProps, validateInputAndGetData } from '../constants';
import { rewardsAbi } from '../abis';

interface Props extends BaseProps {}

/**
 * Get the amount of COMP rewards claimed from a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/rewards/#get-reward-claimed
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getClaimedRewardsPerMarket(
    { chainName, account, tokenAddress }: Props,
    { getProvider }: FunctionOptions
): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;

    const rewardsAddress = marketConfig.rewardsAddress;
    const cometAddress = marketConfig.cometAddress;
    const cometName = marketConfig.name;
    const provider = getProvider(chainId);

    try {
        // Check rewards amount before claiming
        const rewardOwed = await provider.readContract({
            address: rewardsAddress,
            abi: rewardsAbi,
            functionName: 'rewardsClaimed',
            args: [cometAddress, account],
        });

        return toResult(`Owed ${rewardOwed.toString()} rewards from ${cometName}`);
    } catch (error) {
        return toResult(`Failed to claim rewards from ${cometName}`, true);
    }
}
