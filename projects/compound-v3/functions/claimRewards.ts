import { Address, encodeFunctionData } from 'viem';
import { FunctionReturn, FunctionOptions, toResult, TransactionParams } from '@heyanon/sdk';
import { MARKETS, validateInputAndGetData } from '../constants';
import { rewardsAbi } from '../abis';

interface Props {
    chainName: string;
    account: Address;
}

/**
 * Claims available COMP rewards from a Compound V3 market. One reward contract per market.
 * @param param0 - chainName - name of the chain, account - user's wallet address.
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/protocol-rewards/#claim-rewards
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function claimRewards(
    { chainName, account }: Props,
    { getProvider, notify, sendTransactions }: FunctionOptions
): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress: MARKETS[chainName].rewardsAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;

    const rewardsAddress = marketConfig.rewardsAddress;
    const cometAddress = marketConfig.cometAddress;
    const cometName = marketConfig.name;
    const provider = getProvider(chainId);

    try {
        // Check rewards amount before claiming
        const rewardOwed = await provider.multicall({
            contracts: [
                {
                    address: rewardsAddress,
                    abi: rewardsAbi,
                    functionName: 'getRewardOwed',
                    args: [cometAddress, account],
                },
            ],
        });

        // If no rewards, return early
        if (rewardOwed[0]?.result?.owed === 0n) {
            return toResult(`No rewards to claim from ${cometName}`);
        }
        const tx: TransactionParams = {
            target: rewardsAddress,
            data: encodeFunctionData({
                abi: rewardsAbi,
                functionName: 'claim',
                args: [cometAddress, account, true],
            }),
        };

        await notify('Waiting for transaction confirmation...');
        const result = await sendTransactions({ chainId, account, transactions: [tx] });
        const claimMessage = result.data[result.data.length - 1];

        return toResult(
            result.isMultisig
                ? claimMessage.message
                : `Successfully claimed ${rewardOwed.toString()} rewards from ${cometName}. ${claimMessage.message}`
        );
    } catch (error) {
        return toResult(`Failed to claim rewards from ${cometName}`, true);
    }
}
