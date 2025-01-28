import { FunctionReturn, FunctionOptions, toResult } from '@heyanon/sdk';
import { Address } from 'viem';
import { BaseProps, validateInputAndGetData } from '../constants';
import { cometAbi } from '../abis';

interface Props extends Omit<BaseProps, 'tokenAddress'> {
    marketAddress: Address;
}

/**
 * Get amount of tokens in a user's position on a Compound V3 market
 * @param param0 - chainName, account, token, where token name is USDT, USDC, etc. See enum {MarketBaseAssets}
 * @param param1 - tools
 * @description Get lend APR for token on specific networ for Compound protocol
 * @docs https://docs.compound.finance/interest-rates/#get-supply-rate
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getPosition({ chainName, account, marketAddress }: Props, { getProvider }: FunctionOptions): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress: marketAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;

    try {
        const provider = getProvider(chainId);

        const balanceOf = await provider.readContract({
            address: marketAddress,
            abi: cometAbi,
            functionName: 'balanceOf',
            args: [account],
        });

        const decimalBalance = Number(balanceOf) / 10 ** marketConfig.baseAssetDecimals;

        return toResult(`Position on ${marketConfig.name}: ${decimalBalance.toFixed(2)}`);
    } catch (error) {
        return toResult(`Failed to get supply APR for ${marketConfig.name}`, true);
    }
}
