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
    'FBTC' = 'FBTC',
}

export const nativeTokensAddress: { [chain in SupprotedChainsType]: Address } = {
    [ChainId.ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    [ChainId.BASE]: '0x4200000000000000000000000000000000000006',
};

export type CollateralInfo = {
    address: Address;
    symbol: Collaterals;
    decimals: number;
    name: string;
    priceFeedAddress: Address;
}

export type MarketConfig = {
    rewardsAddress: Address;
    bulkerAddress: Address;
    name: string;
    cometAddress: Address;
    baseAsset: MarketBaseAssets;
    baseAssetAddress: Address;
    baseAssetDecimals: number;
    priceFeedAddress: Address;
    collaterals: CollateralInfo[];
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
            priceFeedAddress: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
            collaterals: [
                {
                    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                    priceFeedAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
                },
                {
                    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
                },
                {
                    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
                    decimals: 18,
                    name: 'Uniswap',
                    symbol: Collaterals.UNI,
                    priceFeedAddress: '0x553303d460EE0afB37EdFf9bE42922D8FF63220e',
                },
                {
                    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
                    decimals: 18,
                    name: 'ChainLink Token',
                    symbol: Collaterals.LINK,
                    priceFeedAddress: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
                },
                {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x023ee795361B28cDbB94e302983578486A0A5f1B',
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                    priceFeedAddress: '0x0A4F4F9E84Fc4F674F0D209f94d41FaFE5aF887D',
                },
                {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                    priceFeedAddress: '0xAA9527bf3183A96fe6e55831c96dE5cd988d3484',
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
            priceFeedAddress: '0x3e7d1eab13ad0104d2750b8863b489d65364e32d',
            collaterals: [
                {
                    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
                },
                {
                    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                    priceFeedAddress: '0x4E64E54c9f0313852a230782B3ba4B3B0952B499',
                },
                {
                    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
                    decimals: 18,
                    name: 'Uniswap',
                    symbol: Collaterals.UNI,
                    priceFeedAddress: '0x553303d460EE0afB37EdFf9bE42922D8FF63220e',
                },
                {
                    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
                    decimals: 18,
                    name: 'ChainLink Token',
                    symbol: Collaterals.LINK,
                    priceFeedAddress: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
                },
                {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x023ee795361B28cDbB94e302983578486A0A5f1B',
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                    priceFeedAddress: '0x2D09142Eae60Fd8BD454a276E95AeBdFFD05722d',
                },
                {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                    priceFeedAddress: '0x7b03a016dBC36dB8e05C480192faDcdB0a06bC37'
                },
                {
                    address: '0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812',
                    decimals: 18,
                    name: 'Wrapped Mountain Protocol USD',
                    symbol: Collaterals.wUSDM,
                    priceFeedAddress: '0xe3a409eD15CD53aFdEFdd191ad945cEC528A2496',
                },
                {
                    address: '0xA663B02CF0a4b149d2aD41910CB81e23e1c41c32',
                    decimals: 18,
                    name: 'Staked FRAX',
                    symbol: Collaterals.sFRAX,
                    priceFeedAddress: '0x403F2083B6E220147f8a8832f0B284B4Ed5777d1',
                },
                {
                    address: '0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa',
                    decimals: 18,
                    name: 'mETH',
                    symbol: Collaterals.mETH,
                    priceFeedAddress: '0x2f7439252Da796Ab9A93f7E478E70DED43Db5B89',
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
            priceFeedAddress: '0xff30586cd0f29ed462364c7e81375fc0c71219b1',
            collaterals: [
                {
                    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
                },
                {
                    address: '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3',
                    decimals: 18,
                    name: 'USDe',
                    symbol: Collaterals.USDe,
                    priceFeedAddress: '0xa569d910839Ae8865Da8F8e70FfFb0cBA869F961'
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                    priceFeedAddress: '0x2665701293fCbEB223D11A08D826563EDcCE423A'
                },
                {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                    priceFeedAddress: '0x8350b7De6a6a2C1368E7D4Bd968190e13E354297'
                },
                {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x7dE363b6Bf0a892B94a1Cd0C9DF76826bFC14228'
                },
                {
                    address: '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD',
                    decimals: 18,
                    name: 'Savings USDS',
                    symbol: Collaterals.sUSDS,
                    priceFeedAddress: '0x31B844DBc7CDBAa27D22fD6d54986836D023bF3F'
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
            priceFeedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
            collaterals: [
                {
                    address: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH,
                    priceFeedAddress: '0x23a982b74a3236A5F2297856d4391B2edBBB5549'
                },
                {
                    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x4F67e4d9BD67eFa28236013288737D39AeF48e79'
                },
                {
                    address: '0xae78736Cd615f374D3085123A210448E74Fc6393',
                    decimals: 18,
                    name: 'Rocket Pool ETH',
                    symbol: Collaterals.rETH,
                    priceFeedAddress: '0xA3A7fB5963D1d69B95EEC4957f77678EF073Ba08'
                },
                {
                    address: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
                    decimals: 18,
                    name: 'rsETH',
                    symbol: Collaterals.rsETH,
                    priceFeedAddress: '0xFa454dE61b317b6535A0C462267208E8FdB89f45'
                },
                {
                    address: '0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee',
                    decimals: 18,
                    name: 'Wrapped eETH',
                    symbol: Collaterals.weETH,
                    priceFeedAddress: '0x1Ad4CEBa9f8135A557bBe317DB62Aa125C330F26'
                },
                {
                    address: '0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38',
                    decimals: 18,
                    name: 'Staked ETH',
                    symbol: Collaterals.osETH,
                    priceFeedAddress: '0x66F5AfDaD14b30816b47b707240D1E8E3344D04d'
                },
                {
                    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                    priceFeedAddress: '0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07'
                },
                {
                    address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                    priceFeedAddress: '0xdE43600De5016B50752cc2615332d8cCBED6EC1b'
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                    priceFeedAddress: '0x57A71A9C632b2e6D8b0eB9A157888A3Fc87400D1'
                },
                {
                    address: '0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0',
                    decimals: 18,
                    name: 'rswETH',
                    symbol: Collaterals.rswETH,
                    priceFeedAddress: '0xDd18688Bb75Af704f3Fb1183e459C4d4D41132D9'
                },
                {
                    address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
                    decimals: 18,
                    name: 'tBTC v2',
                    symbol: Collaterals.tBTC,
                    priceFeedAddress: '0x1933F7e5f8B0423fbAb28cE9c8C39C2cC414027B'
                },
                {
                    address: '0xA35b1B31Ce002FBF2058D22F30f95D405200A15b',
                    decimals: 18,
                    name: 'ETHx',
                    symbol: Collaterals.ETHx,
                    priceFeedAddress: '0x9F2F60f38BBc275aF8F88a21c0e2BfE751E97C1f'
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
            priceFeedAddress: '0x023ee795361b28cdbb94e302983578486a0a5f1b',
            collaterals: [
                {
                    address: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
                    decimals: 18,
                    name: 'rsETH',
                    symbol: Collaterals.rsETH,
                    priceFeedAddress: '0xC49399814452B41dA8a7cd76a159f5515cb3e493',
                },
                {
                    address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                    priceFeedAddress: '0xc7986B6318C3f3aB5bE12BAF22892961158D3c24',
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
            priceFeedAddress: '0x50834f3163758fcc1df9973b6e91f0f0f0434ad3',
            collaterals: [
                {
                    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    decimals: 18,
                    name: 'Arbitrum',
                    symbol: Collaterals.ARB,
                    priceFeedAddress: '0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6',
                },
                {
                    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                    decimals: 18,
                    name: 'GMX',
                    symbol: Collaterals.GMX,
                    priceFeedAddress: '0xDB98056FecFff59D032aB628337A4887110df3dB',
                },
                {
                    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                    priceFeedAddress: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
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
            priceFeedAddress: '0x50834f3163758fcc1df9973b6e91f0f0f0434ad3',
            collaterals: [
                {
                    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    decimals: 18,
                    name: 'Arbitrum',
                    symbol: Collaterals.ARB,
                    priceFeedAddress: '0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6',
                },
                {
                    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                    decimals: 18,
                    name: 'GMX',
                    symbol: Collaterals.GMX,
                    priceFeedAddress: '0xDB98056FecFff59D032aB628337A4887110df3dB',
                },
                {
                    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                    priceFeedAddress: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
                },
                {
                    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0xe165155c34fE4cBfC55Fc554437907BDb1Af7e3e',
                },
                {
                    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                    priceFeedAddress: '0xC49399814452B41dA8a7cd76a159f5515cb3e493',
                },
                {
                    address: '0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812',
                    decimals: 18,
                    name: 'Wrapped Mountain Protocol USD',
                    symbol: Collaterals.wUSDM,
                    priceFeedAddress: '0x13cDFB7db5e2F58e122B2e789b59dE13645349C4',
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
            priceFeedAddress: '0x639fe6ab55c921f74e7fac1ee960c0b6293ba612',
            collaterals: [
                {
                    address: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
                    decimals: 18,
                    name: 'Wrapped eETH',
                    symbol: Collaterals.weETH,
                    priceFeedAddress: '0xd3cf278F135D9831D2bF28F6672a4575906CA724',
                },
                {
                    address: '0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8',
                    decimals: 18,
                    name: 'Rocket Pool ETH',
                    symbol: Collaterals.rETH,
                    priceFeedAddress: '0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3',
                },
                {
                    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x6C987dDE50dB1dcDd32Cd4175778C2a291978E2a',
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                    priceFeedAddress: '0xFa454dE61b317b6535A0C462267208E8FdB89f45',
                },
                {
                    address: '0x4186BFC76E2E237523CBC30FD220FE055156b41F',
                    decimals: 18,
                    name: 'KelpDao Restaked ETH',
                    symbol: Collaterals.rsETH,
                    priceFeedAddress: '0x3870FAc3De911c12A57E5a2532D15aD8Ca275A60',
                },
                {
                    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                    decimals: 6,
                    name: 'USD₮0',
                    symbol: Collaterals.USDT,
                    priceFeedAddress: '0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713',
                },
                {
                    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                    decimals: 6,
                    name: 'USD Coin',
                    symbol: Collaterals.USDC,
                    priceFeedAddress: '0x443EA0340cb75a160F31A440722dec7b5bc3C2E9',
                },
                {
                    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                    priceFeedAddress: '0x72e9B6F907365d76C6192aD49C0C5ba356b7Fa48',
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
            priceFeedAddress: '0x3f3f5df88dc9f13eac63df89ec16ef6e7e25dde7',
            collaterals: [
                {
                    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    decimals: 18,
                    name: 'Arbitrum',
                    symbol: Collaterals.ARB,
                    priceFeedAddress: '0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6',
                },
                {
                    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
                },
                {
                    address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0xe165155c34fE4cBfC55Fc554437907BDb1Af7e3e',
                },
                {
                    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                    decimals: 8,
                    name: 'Wrapped BTC',
                    symbol: Collaterals.WBTC,
                    priceFeedAddress: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
                },
                {
                    address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                    decimals: 18,
                    name: 'GMX',
                    symbol: Collaterals.GMX,
                    priceFeedAddress: '0xDB98056FecFff59D032aB628337A4887110df3dB',
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
            priceFeedAddress: '0x7e860098f58bbfc8648a4311b374b1d669a2bc6b',
            collaterals: [
                {
                    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH,
                    priceFeedAddress: '0x4687670f5f01716fAA382E2356C103BaD776752C',
                },
                {
                    address: '0x4200000000000000000000000000000000000006',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
                },
                {
                    address: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118',
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                    priceFeedAddress: '0x8D38A3d6B3c3B7d96D6536DA7Eef94A9d7dbC991',
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
            priceFeedAddress: '0x7e860098f58bbfc8648a4311b374b1d669a2bc6b',
            collaterals: [
                {
                    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH,
                    priceFeedAddress: '0x4687670f5f01716fAA382E2356C103BaD776752C',
                },
                {
                    address: '0x4200000000000000000000000000000000000006',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
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
            priceFeedAddress: '0x2c7118c4c88b9841fcf839074c26ae8f035f2921',
            collaterals: [
                {
                    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                    decimals: 18,
                    name: 'Coinbase Wrapped Staked ETH',
                    symbol: Collaterals.cbETH,
                    priceFeedAddress: '0x59e242D352ae13166B4987aE5c990C232f7f7CD6',
                },
                {
                    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
                    decimals: 18,
                    name: 'Renzo Restaked ETH',
                    symbol: Collaterals.ezETH,
                    priceFeedAddress: '0x72874CfE957bb47795548e5a9fd740D135ba5E45',
                },
                {
                    address: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x1F71901daf98d70B4BAF40DE080321e5C2676856',
                },
                {
                    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                    decimals: 6,
                    name: 'USD Coin',
                    symbol: Collaterals.USDC,
                    priceFeedAddress: '0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0',
                },
                {
                    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A',
                    decimals: 18,
                    name: 'Wrapped eETH',
                    symbol: Collaterals.weETH,
                    priceFeedAddress: '0x841e380e3a98E4EE8912046d69731F4E21eFb1D7',
                },
                {
                    address: '0xEDfa23602D0EC14714057867A78d01e94176BEA0',
                    decimals: 18,
                    name: 'rsETHWrapper',
                    symbol: Collaterals.rsETH,
                    priceFeedAddress: '0xaeB318360f27748Acb200CE616E389A6C9409a07',
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                    priceFeedAddress: '0x4cfCE7795bF75dC3795369A953d9A9b8C2679AE4',
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
            priceFeedAddress: '0x4ec5970fc728c5f65ba413992cd5ff6fd70fcff0',
            collaterals: [
                {
                    address: '0x4200000000000000000000000000000000000006',
                    decimals: 18,
                    name: 'Wrapped Ether',
                    symbol: Collaterals.WETH,
                    priceFeedAddress: '0x2c7118c4C88B9841FCF839074c26Ae8f035f2921',
                },
                {
                    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                    decimals: 6,
                    name: 'USD Coin',
                    symbol: Collaterals.USDC,
                    priceFeedAddress: '0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3',
                },
                {
                    address: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
                    decimals: 18,
                    name: 'Wrapped liquid staked Ether 2.0',
                    symbol: Collaterals.wstETH,
                    priceFeedAddress: '0x5404872d8f2e24b230EC9B9eC64E3855F637FB93',
                },
                {
                    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                    decimals: 8,
                    name: 'Coinbase Wrapped BTC',
                    symbol: Collaterals.cbBTC,
                    priceFeedAddress: '0x8df378453Ff9dEFFa513367CDF9b3B53726303e9',
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

export const getTokenPrice = async (provider: PublicClient, priceFeedAddress: Address): Promise<bigint> => {
    const decimals = await provider.readContract({
        address: priceFeedAddress,
        abi: priceFeedAbi,
        functionName: 'decimals',
    }) as bigint;
    const latestRoundData = await provider.readContract({
        address: priceFeedAddress,
        abi: priceFeedAbi,
        functionName: 'latestRoundData',
    }) as [bigint, bigint, bigint, bigint, bigint, bigint];
    return BigInt(latestRoundData[1]) / BigInt(10n ** BigInt(decimals));
};
