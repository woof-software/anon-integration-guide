import { Address, encodeFunctionData, erc20Abi, parseUnits } from 'viem';
import { FunctionReturn, FunctionOptions, TransactionParams, toResult, checkToApprove } from '@heyanon/sdk';
import { BaseProps, validateInputAndGetData } from '../constants';
import { cometAbi } from '../abis';

interface Props extends BaseProps {
    collateralAddress: Address;
    supplyAmount: string;
}

/**
 * Supplies collateral to a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token, marketAddress - the address of the market, lendAmount - the amount of collateral to lend
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/collateral-and-borrowing/#supply
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function supplyCollateral(
    { chainName, account, tokenAddress, collateralAddress, supplyAmount }: Props,
    { getProvider, sendTransactions, notify }: FunctionOptions,
): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;  

    const cometName = marketConfig.name;
    const cometAddress = marketConfig.cometAddress;
    const transactions: TransactionParams[] = [];
    const provider = getProvider(chainId);
    const collateralInfo = marketConfig.collaterals.find((collateral) => collateral.address === collateralAddress);
    if (!collateralInfo) return toResult('Invalid collateral address', true);

    try {
        // Convert amount to wei
        const supplyAmountInWei = parseUnits(supplyAmount, collateralInfo.decimals);
        if (supplyAmountInWei === 0n) return toResult('Amount must be greater than 0', true);

        // Check user balance
        const userBalance = await provider.readContract({
            address: collateralAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [account],
        });

        if (userBalance < supplyAmountInWei) {
            return toResult('Insufficient balance', true);
        }

        // Check and add approval transaction
        await checkToApprove({
            args: {
                account,
                target: collateralAddress,
                spender: cometAddress,
                amount: supplyAmountInWei,
            },
            provider,
            transactions,
        });

        // Prepare supply collateral transaction
        const repayTx: TransactionParams = {
            target: cometAddress,
            data: encodeFunctionData({
                abi: cometAbi,
                functionName: 'supply',
                args: [collateralAddress, supplyAmountInWei],
            }),
        };

        transactions.push(repayTx);

        await notify('Waiting for transaction confirmation...');
        const result = await sendTransactions({ chainId, account, transactions });
        const depositMessage = result.data[result.data.length - 1];

        return toResult(
            result.isMultisig
                ? depositMessage.message
                : `Successfully supplied ${supplyAmount} collateral to ${cometName}. ${depositMessage.message}`
        );
    } catch (error) {
        return toResult(`Failed to supply ${supplyAmount} collateral to ${cometName}`, true);
    }
}