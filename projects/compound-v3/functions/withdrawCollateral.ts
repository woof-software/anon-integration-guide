import { Address, encodeFunctionData, erc20Abi, parseUnits } from 'viem';
import { FunctionReturn, FunctionOptions, TransactionParams, toResult, getChainFromName, checkToApprove } from '@heyanon/sdk';
import { getMarketConfigByChainAndTokenAddress, isNativeToken, nativeTokensAddress, supportedChains, SupprotedChainsType } from '../constants';
import { cometAbi, wethAbi } from '../abis';

interface Props {
    chainName: string;
    account: Address;
    tokenAddress: Address;
    withdrawAmount: string;
}

export async function withdrawCollateral(
    { chainName, account, tokenAddress, withdrawAmount }: Props,
    { sendTransactions, notify, getProvider }: FunctionOptions
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
            args: [account, tokenAddress],
        });
        // throw error if amount withdrawn is greater than amount supplied
        if (withdrawAmountInWei > collateralBalance[0]) return toResult(`Insufficient balance. You have supplied ${collateralBalance[0]} ${tokenAddress}, while trying to withdraw ${withdrawAmount}.`, true);

        // For native token withdrawals, we need to unwrap after withdrawal
        if (isNativeToken(tokenAddress)) {
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
                    args: [tokenAddress, withdrawAmountInWei],
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

