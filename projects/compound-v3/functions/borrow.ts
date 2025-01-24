import { Address, encodeFunctionData, parseUnits } from 'viem';
import { FunctionReturn, FunctionOptions, TransactionParams, toResult, getChainFromName } from '@heyanon/sdk';
import { getMarketConfigByChainAndTokenAddress, supportedChains, SupprotedChainsType } from '../constants';
import { cometAbi, erc20Abi } from '../abis';

interface Props {
    chainName: string;
    account: Address;
    tokenAddress: Address;
    borrowAmount: string;
}

export async function borrow(
    { chainName, account, tokenAddress, borrowAmount }: Props,
    { getProvider, sendTransactions, notify }: FunctionOptions,
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