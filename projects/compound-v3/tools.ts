import { AiTool, getChainName } from '@heyanon/sdk';
import { supportedChains } from './constants';

const baseProps = [
    {
        name: 'chainName',
        type: 'string',
        enum: supportedChains.map(getChainName),
        description: 'Chain name where to execute the transaction',
    },
    {
        name: 'account',
        type: 'string',
        description: 'Account address that will execute the transaction',
    },
    {
        name: 'tokenAddress',
        type: 'string',
        description: 'Address of the token to interact with',
    },
];

export const claimRewardsProps = [
    {
        name: 'chainName',
        type: 'string',
        enum: supportedChains.map(getChainName),
        description: 'Chain name where to execute the transaction',
    },
    {
        name: 'account',
        type: 'string',
        description: 'Account address that will execute the transaction',
    },
];

const lendProps = [
    {
        name: 'lendAmount',
        type: 'string',
        description: 'Amount of tokens to lend in decimal format',
    },
];

export const supplyCollateralProps = [
    {
        name: 'supplyAmount',
        type: 'string',
        description: 'Amount of tokens to supply in decimal format',
    },
    {
        name: 'collateralAddress',
        type: 'string',
        description: 'Address of the collateral to supply',
    },
];

const marketAddressProps = [
    {
        name: 'marketAddress',
        type: 'string',
        description: 'Market address',
    },
];

export const borrowProps = [
    {
        name: 'borrowAmount',
        type: 'string',
        description: 'Amount of tokens to borrow in decimal format',
    },
];

export const withdrawCollateralProps = [
    {
        name: 'withdrawAmount',
        type: 'string',
        description: 'Amount of tokens to withdraw in decimal format',
    },
    {
        name: 'collateralAddress',
        type: 'string',
        description: 'Address of the collateral to withdraw',
    },
];

export const repayWholeDeptProps = [
    {
        name: 'repayAssetAddress',
        type: 'string',
        description: 'Address of the asset to repay',
    },
];

export const repayDeptProps = [
    {
        name: 'amountToRepay',
        type: 'string',
        description: 'Amount of tokens to repay in decimal format',
    },
    {
        name: 'repayAssetAddress',
        type: 'string',
        description: 'Address of the asset to repay',
    },
];

export const tools: AiTool[] = [
    {
        name: 'getLendApr',
        description: 'Get Lend APR for tokens',
        required: ['chainName', 'account', 'tokenAddress'],
        props: baseProps,
    },
    {
        name: 'getBorrowApr',
        description: 'Get Borrow APR for a tokens',
        required: ['chainName', 'account', 'tokenAddress'],
        props: baseProps,
    },
    {
        name: 'lend',
        description: 'Lend assets into the protocol',
        required: ['chainName', 'account', 'tokenAddress', 'lendAmount'],
        props: [...baseProps, ...lendProps],
    },
    {
        name: 'getPosition',
        description: 'Lend assets into the protocol',
        required: ['chainName', 'account', 'marketAddress'],
        props: [...baseProps.slice(0, 2), ...marketAddressProps],
    },
    {
        name: 'getAllPositionsOnChain',
        description: 'Lend assets into the protocol',
        required: ['chainName', 'account'],
        props: [...baseProps.slice(0, 2)],
    },
    {
        name: 'borrow',
        description: 'Borrow assets from the protocol',
        required: ['chainName', 'account', 'tokenAddress', 'borrowAmount'],
        props: [...baseProps, ...borrowProps],
    },
    {
        name: 'claimRewards',
        description: 'Claim rewards from the protocol',
        required: ['chainName', 'account'],
        props: [...claimRewardsProps],
    },
    {
        name: 'getClaimedRewardsPerMarket',
        description: 'Get claimed rewards from a specific market',
        required: ['chainName', 'account', 'tokenAddress'],
        props: [...baseProps],
    },
    {
        name: 'getClaimedRewards',
        description: 'Get claimed rewards from all markets',
        required: ['chainName', 'account'],
        props: [...baseProps.slice(0, 2)],
    },
    {
        name: 'getOwedRewardsPerMarket',
        description: 'Get owed rewards from the protocol',
        required: ['chainName', 'account'],
        props: [...baseProps],
    },
    {
        name: 'getOwedRewards',
        description: 'Get owed rewards from the protocol',
        required: ['chainName', 'account'],
        props: [...baseProps.slice(0, 2)],
    },
    {
        name: 'supplyCollateral',
        description: 'Supply collateral to the protocol',
        required: ['chainName', 'account', 'tokenAddress', 'collateralAddress', 'supplyAmount'],
        props: [...baseProps, ...supplyCollateralProps],
    },
    {
        name: 'withdrawCollateral',
        description: 'Withdraw collateral from the protocol',
        required: ['chainName', 'account', 'tokenAddress', 'collateralAddress', 'withdrawAmount'],
        props: [...baseProps, ...withdrawCollateralProps],
    },
    {
        name: 'repayDept',
        description: 'Repay debt for any supported asset by Compound',
        required: ['chainName', 'account', 'tokenAddress', 'repayAssetAddress', 'amountToRepay'],
        props: [...baseProps, ...repayDeptProps],
    },
    {
        name: 'repayWholeDept',
        description: 'Repay all debt for any supported asset by Compound',
        required: ['chainName', 'account', 'tokenAddress', 'repayAssetAddress'],
        props: [...baseProps, ...repayWholeDeptProps],
    },
    {
        name: 'getDebtAmount',
        description: 'Get the current debt amount for a user in a Compound market',
        required: ['chainName', 'account', 'tokenAddress'],
        props: [...baseProps],
    },
    {
        name: 'getHealthFactorPerMarket',
        description: 'Get the health factor for a user in a Compound market',
        required: ['chainName', 'account', 'tokenAddress'],
        props: [...baseProps],
    },
    {
        name: 'getHealthFactor',
        description: 'Get the health factor for a user in a Compound market',
        required: ['chainName', 'account'],
        props: [...baseProps.slice(0, 2)],
    },
];
