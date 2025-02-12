import { FunctionReturn, FunctionOptions, toResult } from '@heyanon/sdk';
import { BaseProps, getTokenPrice, validateInputAndGetData } from '../constants';
import { cometAbi } from '../abis';

interface Props extends BaseProps {}

/**
 * Get the health factor of a user in a Compound V3 market
 * @param param0 - chainName - name of the chain, account - user's wallet address, tokenAddress - address of market base token
 * @param param1 - SDK tools
 * @returns {Promise<FunctionReturn>} Result object containing success/error message
 */
export async function getHealthFactorPerMarket(
    { chainName, account, tokenAddress }: Props,
    { getProvider }: FunctionOptions
): Promise<FunctionReturn> {
    const result = validateInputAndGetData({ chainName, account, tokenAddress });
    if (!result.success) return toResult(result.error, true);

    const { marketConfig, chainId } = result;
    const { cometAddress, collaterals, priceFeedAddress } = marketConfig;

    try {
        const provider = getProvider(chainId);
        // Get the borrow value of the user
        const borrowBalance = await provider.readContract({
            address: cometAddress,
            abi: cometAbi,
            functionName: 'borrowBalanceOf',
            args: [account],
        });
        const tokenPrice = await getTokenPrice(provider, priceFeedAddress);
        const borrowValue = borrowBalance * tokenPrice;

        // Get the collaterals value of the user
        let collateralValue = 0n;
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
            collateralValue += (collateralBalance * collateralPrice) * borrowCollateralFactor;
        }

        const healthFactor = collateralValue / borrowValue;

        return toResult(`Health factor: ${healthFactor} at ${tokenAddress} of ${chainName}`);
    } catch (error) {
        return toResult(`Failed to get health factor at ${chainName}`, true);
    }
}
