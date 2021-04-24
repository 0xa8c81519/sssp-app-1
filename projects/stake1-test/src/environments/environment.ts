export const environment = {
    production: true,
    poolId: "p1",
    liquiditySymbol: "BSLP-01",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'bstDAI' }, { symbol: 'bstBUSD' }, { symbol: 'bstUSDT' }],
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
                    address: "0xaD6A40942dA9d4D4E8bE7A6aB6fa560b5B4AdE65"
                },
                pid: 0
            }
        }
    },
};
