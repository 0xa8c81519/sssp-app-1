export const environment = {
    production: false,
    poolId: 'pay',
    paymentTokenSymbol: 'BSLP-01',
    tokenSymbol: 'BST',
    virtualPriceDiff: 0.006,
    coins: [{symbol: 'tUSDC'}, {symbol: 'tBUSD'}, {symbol: 'tUSDT'}],
    rpc: {
        56: '\'https://bsc-dataseed.binance.org/\'',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    },
    chains: {
        97: {
            enabled: true,
            name: 'Testnet',
            contracts: {
                proxy: {
                    address: '0x8814B2B9Defcf2bb810987801548D50000b48dbB'
                },
                payment: {
                    address: '0xC94AED44A474AF9e6eF52E778B1145dD2d2682f4'
                }
            }
        },
    },
    subgraphApi: 'https://api.thegraph.com/subgraphs/name/0xa8c81519/my-subgraph'
};
