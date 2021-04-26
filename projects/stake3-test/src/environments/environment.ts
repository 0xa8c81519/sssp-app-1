export const environment = {
    production: true,
    poolId: "p2",
    liquiditySymbol: "BSLP-03",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'tUSDC' }, { symbol: 'tBUSD' }, { symbol: 'tUSDT' }],
    rpc: {
        56: "'https://bsc-dataseed.binance.org/'",
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    },
    chains: {
        97: {
            enabled: true,
            name: 'Testnet',
            contracts: {
                proxy: {
                    address: "0x3A10b311a090776ad4988D847B2Eae042ad77872"
                },
                pid: 2
            }
        }
    },
};
