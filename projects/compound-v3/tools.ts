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

const lendProps = [
    {
        name: 'lendAmount',
        type: 'string',
        description: 'Amount of tokens to lend in decimal format',
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
        props: [...baseProps.slice(2), ...marketAddressProps],
    },
    {
        name: 'getAllPositionsOnChain',
        description: 'Lend assets into the protocol',
        required: ['chainName', 'account'],
        props: [...baseProps.slice(2)],
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
        required: ['chainName', 'account', 'tokenAddress'],
        props: [...baseProps],
    },
    {
        name: 'getClaimedRewards',
        description: 'Get claimed rewards from the protocol',
        required: ['chainName', 'account', 'tokenAddress'],
        props: [...baseProps],
    },
    {
        name: 'getOwedRewards',
        description: 'Get owed rewards from the protocol',
        required: ['chainName', 'account', 'tokenAddress'],
        props: [...baseProps],
    },
    {
        name: 'lendCollateral',
        description: 'Lend collateral to the protocol',
        required: ['chainName', 'account', 'tokenAddress', 'marketAddress', 'lendAmount'],
        props: [...baseProps, ...marketAddressProps, ...lendProps],
    },
    {
        name: 'withdrawCollateral',
        description: 'Withdraw collateral from the protocol',
        required: ['chainName', 'account', 'tokenAddress', 'withdrawAmount'],
        props: [...baseProps, ...withdrawCollateralProps],
    },
];
