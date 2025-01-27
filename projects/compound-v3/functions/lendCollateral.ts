import { Address, encodeFunctionData, erc20Abi, parseUnits } from 'viem';
import { FunctionReturn, FunctionOptions, TransactionParams, toResult, getChainFromName, checkToApprove } from '@heyanon/sdk';
import { getMarketConfigByChainAndTokenAddress, supportedChains, SupprotedChainsType } from '../constants';
import { cometAbi } from '../abis';

interface Props {
    chainName: string;
    account: Address;
    tokenAddress: Address;
    marketAddress: Address;
    lendAmount: string;
}

/**
 * Lends collateral to a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - the address of the market's underlying token, marketAddress - the address of the market, lendAmount - the amount of collateral to lend
 * @param param1 - SDK tools
 * @docs https://docs.compound.finance/collateral-and-borrowing/#supply
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function lendCollateral(
    { chainName, account, tokenAddress, marketAddress, lendAmount }: Props,
    { getProvider, sendTransactions, notify }: FunctionOptions,
): Promise<FunctionReturn> {
    // Check wallet connection
    if (!account) return toResult('Wallet not connected', true);

    // Validate chain
    const chainId = getChainFromName(chainName) as SupprotedChainsType;
    if (!chainId) return toResult(`Unsupported chain name: ${chainName}`, true);
    if (!supportedChains.includes(chainId)) return toResult(`Protocol is not supported on ${chainName}`, true);

    // Get market config for chain and market
    const marketConfig = getMarketConfigByChainAndTokenAddress(chainId, marketAddress);
    if (!marketConfig) return toResult(`Market ${marketAddress} not found`, true);

    const cometName = marketConfig.name;
    const transactions: TransactionParams[] = [];
    const provider = getProvider(chainId);

    try {
        // Convert amount to wei
        const lendAmountInWei = parseUnits(lendAmount, marketConfig.baseAssetDecimals);
        if (lendAmountInWei === 0n) return toResult('Amount must be greater than 0', true);

        // Check user balance
        const userBalance = await provider.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [account],
        });

        if (userBalance < lendAmountInWei) {
            return toResult('Insufficient balance', true);
        }

        // Check and add approval transaction
        await checkToApprove({
            args: {
                account,
                target: tokenAddress,
                spender: marketAddress,
                amount: lendAmountInWei,
            },
            provider,
            transactions,
        });

        // Prepare supply collateral transaction
        const supplyTx: TransactionParams = {
            target: marketAddress,
            data: encodeFunctionData({
                abi: cometAbi,
                functionName: 'supplyTo',
                args: [account, tokenAddress, lendAmountInWei],
            }),
        };

        transactions.push(supplyTx);

        await notify('Waiting for transaction confirmation...');
        const result = await sendTransactions({ chainId, account, transactions });
        const depositMessage = result.data[result.data.length - 1];

        return toResult(
            result.isMultisig
                ? depositMessage.message
                : `Successfully supplied ${lendAmount} collateral to ${cometName}. ${depositMessage.message}`
        );
    } catch (error) {
        return toResult(`Failed to supply ${lendAmount} collateral to ${cometName}`, true);
    }
}