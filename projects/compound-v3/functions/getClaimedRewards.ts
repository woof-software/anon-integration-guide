import { FunctionReturn, FunctionOptions, toResult, getChainFromName } from '@heyanon/sdk';
import { BaseProps, getAllMarketsOnChain, supportedChains, SupprotedChainsType } from '../constants';
import { rewardsAbi } from '../abis';

interface Props extends Omit<BaseProps, 'tokenAddress'> {}

/**
 * Get the amount of COMP rewards claimed from a Compound V3 all markets
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/rewards/#get-reward-claimed
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getClaimedRewards(
    { chainName, account }: Props,
    { getProvider }: FunctionOptions
): Promise<FunctionReturn> {
    // Check wallet connection
    if (!account) return toResult('Wallet not connected', true);

    // Validate chain
    const chainId = getChainFromName(chainName) as SupprotedChainsType;
    if (!chainId) return toResult('Unsupported chain name: {chainName}', true);
    if (!supportedChains.includes(chainId)) return toResult('Protocol is not supported on \${chainName}', true);

    // Get market config for chain and token
    const marketConfigs = getAllMarketsOnChain(chainId);
    if (!marketConfigs || !marketConfigs.length) return toResult('Market not found', true);
    const provider = getProvider(chainId);

    try {
        const data = await provider.multicall({
            contracts: marketConfigs.map(({ rewardsAddress, cometAddress }) => ({
                address: rewardsAddress,
                abi: rewardsAbi,
                functionName: 'rewardsClaimed',
                args: [cometAddress, account],
            })),
        });
        const rewardOwed = data.reduce((acc, curr) => acc + Number(curr.result) || 0, 0);

        return toResult(`Owed ${rewardOwed} rewards at ${chainName}`);
    } catch (error) {
        return toResult(`Failed to claim rewards at ${chainName}`, true);
    }
}
