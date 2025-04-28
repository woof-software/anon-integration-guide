import { FunctionReturn, FunctionOptions, toResult, getChainFromName } from '@heyanon/sdk';
import { BaseProps, getAllMarketsOnChain, getTokenPrice, supportedChains, SupprotedChainsType } from '../constants';
import { cometAbi } from '../abis';

interface Props extends Omit<BaseProps, 'tokenAddress'> {}

/**
 * Get the health factor of a user in a Compound V3 chain
 * @param param0 - chainName - name of the chain, account - user's wallet address
 * @param param1 - SDK tools
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getHealthFactor(
    { chainName, account }: Props,
    { getProvider }: FunctionOptions
): Promise<FunctionReturn> {
    // Check wallet connection
    if (!account) return toResult('Wallet not connected', true);

    // Validate chain
    const chainId = getChainFromName(chainName) as SupprotedChainsType;
    if (!chainId) return toResult('Unsupported chain name: {chainName}', true);
    if (!supportedChains.includes(chainId)) return toResult('Protocol is not supported on \${chainName}', true);

    // Get market config for chain and token
    const marketConfigs = getAllMarketsOnChain(chainId);
    if (!marketConfigs || !marketConfigs.length) return toResult('Market not found', true);

    try {
        const provider = getProvider(chainId);
        let totalBorrowValue = 0n;
        let totalCollateralValue = 0n;
        for (const marketConfig of marketConfigs) {
            const { cometAddress, collaterals } = marketConfig;
            // Get the borrow value of the user in the market
            const borrowBalance = await provider.readContract({
                address: cometAddress,
                abi: cometAbi,
                functionName: 'borrowBalanceOf',
                args: [account],
            });
            const tokenPrice = await getTokenPrice(provider, marketConfig.priceFeedAddress);
            totalBorrowValue += borrowBalance * tokenPrice;

            // Get the collaterals value of the user in the market
            for (const collateral of collaterals) {
                const [collateralBalance] = await provider.readContract({
                    address: cometAddress,
                    abi: cometAbi,
                    functionName: 'userCollateral',
                    args: [account, collateral.address],
                });
                if (collateralBalance === 0n) continue;
                const collateralPrice = await getTokenPrice(provider, collateral.priceFeedAddress);

                const { borrowCollateralFactor } = await provider.readContract({
                    address: cometAddress,
                    abi: cometAbi,
                    functionName: 'getAssetInfoByAddress',
                    args: [collateral.address],
                });
                totalCollateralValue += (collateralBalance * collateralPrice) * borrowCollateralFactor;
            }
        }

        const healthFactor = totalCollateralValue / totalBorrowValue;
        return toResult(`Health factor for ${chainName}: ${healthFactor}`);
    } catch (error) {
        return toResult(`Failed to get health factor at ${chainName}`, true);
    }
}
