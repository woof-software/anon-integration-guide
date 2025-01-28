import { FunctionReturn, FunctionOptions, toResult } from '@heyanon/sdk';
import { Address } from 'viem';
import {
    BaseProps,
    getAllMarketsOnChain,
    MarketConfig,
    validateInputAndGetData,
} from '../constants';
import { cometAbi } from '../abis';

interface Props extends BaseProps {}

/**
 * Get all positions on a specific chain for a user by all markets
 * @param param0 - chainName, account, token, where token name is USDT, USDC, etc. See enum {MarketBaseAssets}
 * @param param1 - tools
 * @docs https://docs.compound.finance/interest-rates/#get-supply-rate
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getAllPositionsOnChain({ chainName, account }: Props, { getProvider }: FunctionOptions): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress: '' as Address });
    if (!result.success) return toResult(result.error, true);
    const { chainId } = result;

    // Get market config for chain and token
    const marketConfigs = getAllMarketsOnChain(chainId);
    if (!marketConfigs || !marketConfigs.length) return toResult('Market not found', true);

    const marketAddresses = marketConfigs.map((market) => market.cometAddress);

    try {
        const provider = getProvider(chainId);

        const multicallData = [
            ...marketAddresses.map((market) => {
                return {
                    address: market,
                    abi: cometAbi,
                    functionName: 'balanceOf',
                    args: [account],
                };
            }),
        ];

        const balances = await provider.multicall({
            contracts: multicallData as any[],
        });

        const balancesWithDecimals = marketConfigs.map((market: MarketConfig, i) => {
            return {
                market: market,
                balance: Number(balances[i].result) / 10 ** market.baseAssetDecimals,
            };
        });

        return toResult(`Positions: ${balancesWithDecimals.map((balance) => `${balance.market.name}: ${balance.balance.toFixed(2)}`).join(', ')}`);
    } catch (error) {
        return toResult(`Failed to get all positions on ${chainId}`, true);
    }
}
