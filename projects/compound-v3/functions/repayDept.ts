import { Address, encodeFunctionData, erc20Abi, parseUnits } from 'viem';
import { FunctionReturn, FunctionOptions, TransactionParams, toResult, checkToApprove } from '@heyanon/sdk';
import { BaseProps, COLLATERAL_DECIMALS, validateInputAndGetData } from '../constants';
import { cometAbi } from '../abis';

interface Props extends BaseProps {
    amountToRepay: string;
    repayAssetAddress: Address;
}

/**
 * Repay debt for any supported asset by Compound
 * @param param0 - chainName, account, token, repayAssetAddress, amountToRepay
 * @param param1 - tools
 * @docs https://docs.compound.finance/collateral-and-borrowing/#repay
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function repayDept({ chainName, account, tokenAddress, repayAssetAddress, amountToRepay }: Props, { sendTransactions, notify, getProvider }: FunctionOptions): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;   

    const cometAddress = marketConfig.cometAddress;
    const cometName = marketConfig.name;
    const transactions: TransactionParams[] = [];
    const provider = getProvider(chainId);

    try {
        const amountToRepayInWei = parseUnits(amountToRepay, COLLATERAL_DECIMALS);

        // Get user balance of repay asset
        const userBalance = await provider.readContract({
            address: repayAssetAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [account],
        });

        // check is balance is greater than repay amount
        if (Number(userBalance) < Number(amountToRepayInWei)) {
            return toResult('Insufficient balance', true);
        }

        await checkToApprove({
            args: {
                account,
                target: repayAssetAddress,
                spender: cometAddress,
                amount: amountToRepayInWei,
            },
            provider,
            transactions,
        });

        // Prepare deposit transaction
        const tx: TransactionParams = {
            target: cometAddress,
            data: encodeFunctionData({
                abi: cometAbi,
                functionName: 'supply',
                args: [tokenAddress, amountToRepayInWei],
            }),
        };

        transactions.push(tx);

        await notify('Waiting for transaction confirmation...');
        const result = await sendTransactions({ chainId, account, transactions });
        const repayMessage = result.data[result.data.length - 1];

        return toResult(result.isMultisig ? repayMessage.message : `Successfully repaid ${amountToRepay} to ${cometName}. ${repayMessage.message}`);
    } catch (error) {
        return toResult(`Failed to repay ${amountToRepay} into ${cometName}`, true);
    }
}
