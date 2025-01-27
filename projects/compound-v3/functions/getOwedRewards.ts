import { Address } from 'viem';
import { FunctionReturn, FunctionOptions, toResult, getChainFromName } from '@heyanon/sdk';
import { getMarketConfigByChainAndTokenAddress, supportedChains, SupprotedChainsType } from '../constants';
import { rewardsAbi } from '../abis';

interface Props {
    chainName: string;
    account: Address;
    tokenAddress: Address;
}

/**
 * Get the amount of COMP rewards owed from a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/protocol-rewards/#get-reward-accrued
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getOwedRewards(
    { chainName, account, tokenAddress }: Props,
    { getProvider }: FunctionOptions
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

        return toResult(`Owed ${rewardOwed[0]?.result?.owed} rewards from ${cometName}`);
    } catch (error) {
        return toResult(`Failed to claim rewards from ${cometName}`, true);
    }
}
