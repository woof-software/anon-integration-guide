import { FunctionReturn, FunctionOptions, toResult } from '@heyanon/sdk';
import { BaseProps, SECONDS_PER_YEAR, validateInputAndGetData } from '../constants';
import { cometAbi } from '../abis';

interface Props extends BaseProps {}

/**
 * Get lend APR for a token on a specific network for Compound protocol
 * @param param0 - chainName, account, token, where token name is USDT, USDC, etc. See enum {MarketBaseAssets}
 * @param param1 - tools
 * @docs https://docs.compound.finance/interest-rates/#get-supply-rate
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getLendApr({ chainName, account, tokenAddress }: Props, { getProvider }: FunctionOptions): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;

    const cometAddress = marketConfig.cometAddress;

    try {
        const provider = getProvider(chainId);

        // https://docs.compound.finance/interest-rates/#get-supply-rate
        const utilization = await provider.readContract({
            address: cometAddress,
            abi: cometAbi,
            functionName: 'getUtilization',
        });

        // We cannot use multicall for optimization, as getBorrowRate requires current utilization
        const supplyRate = await provider.readContract({
            address: cometAddress,
            abi: cometAbi,
            functionName: 'getSupplyRate',
            args: [utilization],
        });

        const supplyAPR = (Number(supplyRate) / 10 ** 18) * SECONDS_PER_YEAR * 100;

        return toResult(`Lend APR on ${marketConfig.name}: ${supplyAPR.toFixed(2)}%`);
    } catch (error) {
        return toResult(`Failed to get supply APR for ${marketConfig.name}`, true);
    }
}
