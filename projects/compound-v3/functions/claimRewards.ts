import { Address, encodeFunctionData } from 'viem';
import { FunctionReturn, FunctionOptions, toResult, getChainFromName, TransactionParams } from '@heyanon/sdk';
import { getMarketConfigByChainAndTokenAddress, supportedChains, SupprotedChainsType } from '../constants';
import { rewardsAbi } from '../abis';

interface Props {
    chainName: string;
    account: Address;
    tokenAddress: Address;
}

/**
 * Claims available COMP rewards from a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/protocol-rewards/#claim-rewards
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function claimRewards(
    { chainName, account, tokenAddress }: Props,
    { getProvider, notify, sendTransactions }: FunctionOptions
): Promise<FunctionReturn> {
    // Check wallet connection
    if (!account) return toResult('Wallet not connected', true);

    // Validate chain
    const chainId = getChainFromName(chainName) as SupprotedChainsType;
    if (!chainId) return toResult(`Unsupported chain name: ${chainName}`, true);
    if (!supportedChains.includes(chainId)) return toResult(`Protocol is not supported on ${chainName}`, true);

    // Get market config for chain and token
    const marketConfig = getMarketConfigByChainAndTokenAddress(chainId, tokenAddress);
    if (!marketConfig) return toResult(`Market ${tokenAddress} not found`, true);

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
