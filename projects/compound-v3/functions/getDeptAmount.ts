import { FunctionReturn, FunctionOptions, toResult } from '@heyanon/sdk';
import { BaseProps, validateInputAndGetData } from '../constants';
import { cometAbi } from '../abis';

interface Props extends BaseProps {}

/**
 * Get the current debt amount for a user in a Compound market
 * @param param0 - chainName, account, tokenAddress
 * @param param1 - tools
 * @docs https://docs.compound.finance/helper-functions/#borrow-balance
 * @returns {Promise<FunctionReturn>} Result object containing the borrowed amount or error message
 */
export async function getDeptAmount({ chainName, account, tokenAddress }: Props, { getProvider }: FunctionOptions): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;   

    const cometAddress = marketConfig.cometAddress;
    const provider = getProvider(chainId);

    try {
        const borrowedAmount = await provider.readContract({
            address: cometAddress,
            abi: cometAbi,
            functionName: 'borrowBalanceOf',
            args: [account],
        });

        return toResult(`Your debt is ${borrowedAmount}`);
    } catch (error) {
        return toResult(`Failed to get debt`, true);
    }
}
