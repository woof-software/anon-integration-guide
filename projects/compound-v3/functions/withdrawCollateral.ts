import { Address, encodeFunctionData, parseUnits } from 'viem';
import { FunctionReturn, FunctionOptions, TransactionParams, toResult } from '@heyanon/sdk';
import { BaseProps, isNativeToken, nativeTokensAddress, validateInputAndGetData } from '../constants';
import { cometAbi, wethAbi } from '../abis';

interface Props extends BaseProps {
    collateralAddress: Address;
    withdrawAmount: string;
}

/**
 * Withdraws collateral from a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token, withdrawAmount - the amount of collateral to withdraw
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/collateral-and-borrowing/#withdraw-or-borrow
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function withdrawCollateral(
    { chainName, account, tokenAddress, collateralAddress, withdrawAmount }: Props,
    { sendTransactions, notify, getProvider }: FunctionOptions
): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;  

    const cometAddress = marketConfig.cometAddress;
    const cometName = marketConfig.name;
    const transactions: TransactionParams[] = [];
    const provider = getProvider(chainId);

    try {
        const withdrawAmountInWei = parseUnits(withdrawAmount, marketConfig.baseAssetDecimals);
        if (withdrawAmountInWei === 0n) return toResult('Amount must be greater than 0', true);

        // Check user's collateral balance
        const collateralBalance = await provider.readContract({
            address: cometAddress,
            abi: cometAbi,
            functionName: 'userCollateral',
            args: [account, collateralAddress],
        });
        // throw error if amount withdrawn is greater than amount supplied
        if (withdrawAmountInWei > collateralBalance[0]) return toResult(`Insufficient balance. You have supplied ${collateralBalance[0]} ${collateralAddress}, while trying to withdraw ${withdrawAmount}.`, true);

        // For native token withdrawals, we need to unwrap after withdrawal
        if (isNativeToken(collateralAddress)) {
            const wrappedAddress = nativeTokensAddress[chainId];
            if (!wrappedAddress) {
                return toResult(`Wrapped native address not found for chain ${chainId}`, true);
            }

            // Withdraw collateral (wrapped token)
            const withdrawTx: TransactionParams = {
                target: cometAddress,
                data: encodeFunctionData({
                    abi: cometAbi,
                    functionName: 'withdraw',
                    args: [wrappedAddress, withdrawAmountInWei],
                }),
            };
            transactions.push(withdrawTx);

            // Unwrap native token
            const unwrapTx: TransactionParams = {
                target: wrappedAddress,
                data: encodeFunctionData({
                    abi: wethAbi,
                    functionName: 'withdraw',
                    args: [withdrawAmountInWei],
                }),
            };
            transactions.push(unwrapTx);
        } else {
            // For other tokens, simple withdrawal
            const withdrawTx: TransactionParams = {
                target: cometAddress,
                data: encodeFunctionData({
                    abi: cometAbi,
                    functionName: 'withdraw',
                    args: [collateralAddress, withdrawAmountInWei],
                }),
            };
            transactions.push(withdrawTx);
        }

        await notify('Waiting for transaction confirmation...');
        const result = await sendTransactions({ chainId, account, transactions });
        const withdrawMessage = result.data[result.data.length - 1];

        return toResult(
            result.isMultisig
                ? withdrawMessage.message
                : `Successfully withdrew ${withdrawAmount} collateral from ${cometName}. ${withdrawMessage.message}`
        );
    } catch (error) {
        return toResult(`Failed to withdraw ${withdrawAmount} collateral from ${cometName}`, true);
    }
}

