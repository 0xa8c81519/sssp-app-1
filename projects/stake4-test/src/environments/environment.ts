export const environment = {
    production: false,
    poolId: "p2",
    liquiditySymbol: "BSPT",
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
                pid: 3
            }
        }
    },
};
