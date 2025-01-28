import { Address, encodeFunctionData, parseUnits } from 'viem';
import { FunctionReturn, FunctionOptions, TransactionParams, toResult, getChainFromName } from '@heyanon/sdk';
import { BaseProps, getMarketConfigByChainAndTokenAddress, supportedChains, SupprotedChainsType, validateInputAndGetData } from '../constants';
import { cometAbi, erc20Abi } from '../abis';

interface Props extends BaseProps {
    borrowAmount: string;
}

/**
 * Borrows tokens from a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token, borrowAmount - the amount of tokens to borrow
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/collateral-and-borrowing/#withdraw-or-borrow
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function borrow(
    { chainName, account, tokenAddress, borrowAmount }: Props,
    { getProvider, sendTransactions, notify }: FunctionOptions,
): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;

    const cometAddress = marketConfig.cometAddress;
    const cometName = marketConfig.name;
    const provider = getProvider(chainId);

    try {
        const borrowAmountInWei = parseUnits(borrowAmount, marketConfig.baseAssetDecimals);
        if (borrowAmountInWei === 0n) return toResult('Amount must be greater than 0', true);

        // Check token balance
        const supplyAssetBalance = await provider.readContract({ abi: erc20Abi, address: tokenAddress, functionName: 'balanceOf', args: [account] });
        if (supplyAssetBalance < borrowAmountInWei) return toResult(`Insufficient balance. You have ${supplyAssetBalance} ${tokenAddress}, while trying to withdraw ${borrowAmount}.`, true);

        // Prepare borrow transaction
        const tx: TransactionParams = {
            target: cometAddress,
            data: encodeFunctionData({
                abi: cometAbi,
                functionName: 'withdraw',
                args: [tokenAddress, borrowAmountInWei],
            }),
        };


        await notify('Waiting for transaction confirmation...');
        const result = await sendTransactions({ chainId, account, transactions: [tx] });
        const borrowMessage = result.data[result.data.length - 1];

        return toResult(result.isMultisig ? borrowMessage.message : `Successfully borrowed ${borrowAmount} from ${cometName}. ${borrowMessage.message}`);
    } catch (error) {
        return toResult(`Failed to borrow ${borrowAmount} from ${cometName}`, true);
    }
}