import { ChainId, getChainFromName, NATIVE_ADDRESS, WETH9 } from '@heyanon/sdk';
import { Address, PublicClient } from 'viem';
import { priceFeedAbi } from './abis';

export const supportedChains = [ChainId.ETHEREUM, ChainId.ARBITRUM, ChainId.BASE];
export type SupprotedChainsType = ChainId.ETHEREUM | ChainId.ARBITRUM | ChainId.BASE;

export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;

export enum MarketBaseAssets {
    'USDC' = 'USDC',
    'USDC.e' = 'USDC.e',
    'USDbC' = 'USDbC',
    'WETH' = 'WETH',
    'AERO' = 'AERO',
    'USDT' = 'USDT',
    'USDS' = 'USDS',
    'wstETH' = 'wstETH',
}

export enum Collaterals {
    'WBTC' = 'WBTC',
    'WETH' = 'WETH',
    'UNI' = 'UNI',
    'LINK' = 'LINK',
    'wstETH' = 'wstETH',
    'cbBTC' = 'cbBTC',
    'tBTC' = 'tBTC',
    'wUSDM' = 'wUSDM',
    'sFRAX' = 'sFRAX',
    'mETH' = 'mETH',
    'USDe' = 'USDe',
    'sUSDS' = 'sUSDS',
    'cbETH' = 'cbETH',
    'rETH' = 'rETH',
    'rsETH' = 'rsETH',
    'weETH' = 'weETH',
    'osETH' = 'osETH',
    'ezETH' = 'ezETH',
    'rswETH' = 'rswETH',
    'ETHx' = 'ETHx',
    'ARB' = 'ARB',
    'GMX' = 'GMX',
    'USDT' = 'USDT',
    'USDC' = 'USDC',
}

export const nativeTokensAddress: { [chain in SupprotedChainsType]: Address } = {
    [ChainId.ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    [ChainId.BASE]: '0x4200000000000000000000000000000000000006',
};

export type MarketConfig = {
    rewardsAddress: Address;
    bulkerAddress: Address;
    name: string;
    cometAddress: Address;
    baseAsset: MarketBaseAssets;
    baseAssetAddress: Address;
    baseAssetDecimals: number;
    collaterals: {
        address: Address;
        symbol: Collaterals;
        decimals: number;
        name: string;
    }[];
};

export const MARKETS: { [chain in SupprotedChainsType]: MarketConfig[] } = {
    [ChainId.ETHEREUM]: [
        {
            rewardsAddress: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
            bulkerAddress: '0x74a81F84268744a40FEBc48f8b812a1f188D80C3',
            name: 'Compound USDC Ethereum',
            cometAddress: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
            baseAsset: MarketBaseAssets.USDC,
            baseAssetAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            baseAssetDecimals: 6,
            collaterals: [
                {
                    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                  },
                  {
                    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                  },
                  {
                    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
                    decimals: 18,
                    name: 'Uniswap',
                    symbol: Collaterals.UNI,
                  },
                  {
                    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
                    decimals: 18,
                    name: 'ChainLink Token',
                    symbol: Collaterals.LINK,
                  },
                  {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                  },
                  {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                  },
                  {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                  },
            ],
        },
        {
            rewardsAddress: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
            bulkerAddress: '0xa397a8C2086C554B531c02E29f3291c9704B00c7',
            name: 'Compound USDT Ethereum',
            cometAddress: '0x3Afdc9BCA9213A35503b077a6072F3D0d5AB0840',
            baseAsset: MarketBaseAssets.USDT,
            baseAssetAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            baseAssetDecimals: 6,
            collaterals: [
                {
                    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                },
                {
                    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                },
                {
                    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
                    decimals: 18,
                    name: 'Uniswap',
                    symbol: Collaterals.UNI,
                },
                {
                    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
                    decimals: 18,
                    name: 'ChainLink Token',
                    symbol: Collaterals.LINK,
                },
                {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                },
                {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                },
                {
                    address: '0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812',
                    decimals: 18,
                    name: 'Wrapped Mountain Protocol USD',
                    symbol: Collaterals.wUSDM,
                },
                {
                    address: '0xA663B02CF0a4b149d2aD41910CB81e23e1c41c32',
                    decimals: 18,
                    name: 'Staked FRAX',
                    symbol: Collaterals.sFRAX,
                },
                {
                    address: '0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa',
                    decimals: 18,
                    name: 'mETH',
                    symbol: Collaterals.mETH,
                }
            ],
        },
        {
            rewardsAddress: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
            bulkerAddress: '0xa397a8C2086C554B531c02E29f3291c9704B00c7',
            name: 'Compound USDS Ethereum',
            cometAddress: '0x5D409e56D886231aDAf00c8775665AD0f9897b56',
            baseAsset: MarketBaseAssets.USDS,
            baseAssetAddress: '0xdC035D45d973E3EC169d2276DDab16f1e407384F',
            baseAssetDecimals: 18,
            collaterals: [
                {
                    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                },
                {
                    address: '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3',
                    decimals: 18,
                    name: 'USDe',
                    symbol: Collaterals.USDe,
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                },
                {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                },
                {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD',
                    decimals: 18,
                    name: 'Savings USDS',
                    symbol: Collaterals.sUSDS,
                }
            ]
        },
        {
            rewardsAddress: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
            bulkerAddress: '0xa397a8C2086C554B531c02E29f3291c9704B00c7',
            name: 'Compound WETH Ethereum',
            cometAddress: '0xA17581A9E3356d9A858b789D68B4d866e593aE94',
            baseAsset: MarketBaseAssets.WETH,
            baseAssetAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            baseAssetDecimals: 18,
            collaterals: [
                {
                    address: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH
                },
                {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0xae78736Cd615f374D3085123A210448E74Fc6393',
                    decimals: 18,
                    name: 'Rocket Pool ETH',
                    symbol: Collaterals.rETH,
                },
                {
                    address: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
                    decimals: 18,
                    name: 'rsETH',
                    symbol: Collaterals.rsETH,
                },
                {
                    address: '0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee',
                    decimals: 18,
                    name: 'Wrapped eETH',
                    symbol: Collaterals.weETH,
                },
                {
                    address: '0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38',
                    decimals: 18,
                    name: 'Staked ETH',
                    symbol: Collaterals.osETH,
                },
                {
                    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                },
                {
                    address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                },
                {
                    address: '0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0',
                    decimals: 18,
                    name: 'rswETH',
                    symbol: Collaterals.rswETH,
                },
                {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                },
                {
                    address: '0xA35b1B31Ce002FBF2058D22F30f95D405200A15b',
                    decimals: 18,
                    name: 'ETHx',
                    symbol: Collaterals.ETHx,
                }
            ]
        },
        {
            rewardsAddress: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
            bulkerAddress: '0x2c776041CCFe903071AF44aa147368a9c8EEA518',
            name: 'Compound wstETH Ethereum',
            cometAddress: '0x3D0bb1ccaB520A66e607822fC55BC921738fAFE3',
            baseAsset: MarketBaseAssets.wstETH,
            baseAssetAddress: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
            baseAssetDecimals: 18,
            collaterals: [
                {
                    address: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
                    decimals: 18,
                    name: 'rsETH',
                    symbol: Collaterals.rsETH,
                },
                {
                    address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                }
            ]
        },
    ],
    [ChainId.ARBITRUM]: [
        {
            rewardsAddress: '0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae',
            bulkerAddress: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
            name: 'Compound USDC.e Arbitrum',
            cometAddress: '0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA',
            baseAsset: MarketBaseAssets['USDC.e'],
            baseAssetAddress: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
            baseAssetDecimals: 6,
            collaterals: [
                {
                    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    decimals: 18,
                    name: 'Arbitrum',
                    symbol: Collaterals.ARB,
                },
                {
                    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                    decimals: 18,
                    name: 'GMX',
                    symbol: Collaterals.GMX,
                },
                {
                    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                }
            ]
        },
        {
            rewardsAddress: '0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae',
            bulkerAddress: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
            name: 'Compound USDC Arbitrum',
            cometAddress: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
            baseAsset: MarketBaseAssets.USDC,
            baseAssetAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
            baseAssetDecimals: 6,
            collaterals: [
                {
                    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    decimals: 18,
                    name: 'Arbitrum',
                    symbol: Collaterals.ARB,
                },
                {
                    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                    decimals: 18,
                    name: 'GMX',
                    symbol: Collaterals.GMX,
                },
                {
                    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                },
                {
                    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                },
                {
                    address: '0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812',
                    decimals: 18,
                    name: 'Wrapped Mountain Protocol USD',
                    symbol: Collaterals.wUSDM,
                }
            ]
        },
        {
            rewardsAddress: '0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae',
            bulkerAddress: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
            name: 'Compound WETH Arbitrum',
            cometAddress: '0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486',
            baseAsset: MarketBaseAssets.WETH,
            baseAssetAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
            baseAssetDecimals: 18,
            collaterals: [
                {
                    address: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
                    decimals: 18,
                    name: 'Wrapped eETH',
                    symbol: Collaterals.weETH,
                },
                {
                    address: '0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8',
                    decimals: 18,
                    name: 'Rocket Pool ETH',
                    symbol: Collaterals.rETH,
                },
                {
                    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                },
                {
                    address: '0x4186BFC76E2E237523CBC30FD220FE055156b41F',
                    decimals: 18,
                    name: 'KelpDao Restaked ETH',
                    symbol: Collaterals.rsETH,
                },
                {
                    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                    decimals: 6,
                    name: 'USD₮0',
                    symbol: Collaterals.USDT,
                },
                {
                    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                    decimals: 6,
                    name: 'USD Coin',
                    symbol: Collaterals.USDC,
                },
                {
                    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                }
            ]
        },
        {
            rewardsAddress: '0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae',
            bulkerAddress: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
            name: 'Compound USDT Arbitrum',
            cometAddress: '0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07',
            baseAsset: MarketBaseAssets.USDT,
            baseAssetAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
            baseAssetDecimals: 6,
            collaterals: [
                {
                    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    decimals: 18,
                    name: 'Arbitrum',
                    symbol: Collaterals.ARB,
                },
                {
                    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                },
                {
                    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                },
                {
                    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                    decimals: 18,
                    name: 'GMX',
                    symbol: Collaterals.GMX,
                }
            ]
        },
    ],
    [ChainId.BASE]: [
        {
            rewardsAddress: '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1',
            bulkerAddress: '0x78D0677032A35c63D142a48A2037048871212a8C',
            name: 'Compound USDC Base',
            cometAddress: '0xb125E6687d4313864e53df431d5425969c15Eb2F',
            baseAsset: MarketBaseAssets.USDC,
            baseAssetAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            baseAssetDecimals: 6,
            collaterals: [
                {
                  address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH,
                },
                {
                  address: '0x4200000000000000000000000000000000000006',
                  decimals: 18,
                  name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                },
                {
                    address: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                }
            ]
        },
        {
            rewardsAddress: '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1',
            bulkerAddress: '0x78D0677032A35c63D142a48A2037048871212a8C',
            name: 'Compound USDbC Base',
            cometAddress: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
            baseAsset: MarketBaseAssets.USDbC,
            baseAssetAddress: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
            baseAssetDecimals: 6,
            collaterals: [
                {
                    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH,
                },
                {
                    address: '0x4200000000000000000000000000000000000006',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                }
            ]
        },
        {
            rewardsAddress: '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1',
            bulkerAddress: '0x78D0677032A35c63D142a48A2037048871212a8C',
            name: 'Compound WETH Base',
            cometAddress: '0x46e6b214b524310239732D51387075E0e70970bf',
            baseAsset: MarketBaseAssets.WETH,
            baseAssetAddress: '0x4200000000000000000000000000000000000006',
            baseAssetDecimals: 18,
            collaterals: [
                {
                    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH,
                },
                {
                    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                },
                {
                    address: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                    decimals: 6,
                    name: 'USD Coin',
                    symbol: Collaterals.USDC,
                },
                {
                    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A',
                    decimals: 18,
                    name: 'Wrapped eETH',
                    symbol: Collaterals.weETH,
                },
                {
                    address: '0xEDfa23602D0EC14714057867A78d01e94176BEA0',
                    decimals: 18,
                    name: 'rsETHWrapper',
                    symbol: Collaterals.rsETH,
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                }
            ]
        },
        {
            rewardsAddress: '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1',
            bulkerAddress: '0x78D0677032A35c63D142a48A2037048871212a8C',
            name: 'Compound AERO Base',
            cometAddress: '0x784efeB622244d2348d4F2522f8860B96fbEcE89',
            baseAsset: MarketBaseAssets.AERO,
            baseAssetAddress: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
            baseAssetDecimals: 18,
            collaterals: [
                {
                    address: '0x4200000000000000000000000000000000000006',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                },
                {
                    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                    decimals: 6,
                    name: 'USD Coin',
                    symbol: Collaterals.USDC,
                },
                {
                    address: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                }
            ]
        },
    ],
};

export const COLLATERAL_DECIMALS = 18;

export const COMPOUND_TOKEN_DECIMALS = 18;

export const getMarketConfigByChainAndTokenAddress = (chainId: SupprotedChainsType, tokenAddress: Address): MarketConfig => {
    if (NATIVE_ADDRESS === tokenAddress) {
        return MARKETS[chainId].find((market) => market.baseAssetAddress === WETH9[chainId].address) as MarketConfig;
    }

    return MARKETS[chainId].find((market) => market.baseAssetAddress === tokenAddress) as MarketConfig;
};

export const getMarketConfigByChainAndMarketAddress = (chainId: SupprotedChainsType, marketAddress: Address): MarketConfig => {
    return MARKETS[chainId].find((market) => market.cometAddress.toUpperCase() === marketAddress.toUpperCase()) as MarketConfig;
};

export const isNativeToken = (tokenAddress: Address): boolean => {
    return tokenAddress === NATIVE_ADDRESS;
};

export const getWrappedNative = (chainId: Address): boolean => {
    return WETH9[chainId];
};

export const isUsdtOnEthereum = (chainId: ChainId, tokenAddress: Address): boolean => {
    return chainId === ChainId.ETHEREUM && tokenAddress.toUpperCase() === getMarketConfigByChainAndTokenAddress(chainId, tokenAddress).baseAssetAddress.toUpperCase();
};

export const getAllMarketsOnChain = (chainId: SupprotedChainsType): MarketConfig[] => {
    return MARKETS[chainId];
};

export interface BaseProps {
    chainName: string;
    account: Address;
    tokenAddress: Address;
}

export const validateInputAndGetData = ({
    account,
    chainName,
    tokenAddress,
}: BaseProps): { success: true; marketConfig: MarketConfig; chainId: SupprotedChainsType } | { success: false; error: string } => {
    // Check wallet connection
    if (!account) return { success: false, error: 'Wallet not connected' };

    // Validate chain
    const chainId = getChainFromName(chainName) as SupprotedChainsType;
    if (!chainId) return { success: false, error: `Unsupported chain name: ${chainName}` };
    if (!supportedChains.includes(chainId)) return { success: false, error: `Protocol is not supported on ${chainName}` };

    // Get market config for chain and token
    const marketConfig = getMarketConfigByChainAndTokenAddress(chainId, tokenAddress);
    if (!marketConfig) return { success: false, error: `Market ${tokenAddress} not found` };

    return {
        success: true,
        marketConfig,
        chainId,
    };
};