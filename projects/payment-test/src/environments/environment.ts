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
                    address: '0xaD6A40942dA9d4D4E8bE7A6aB6fa560b5B4AdE65'
                },
                payment: {
                    address: '0x2a248616553c2e727D143C6820c2238cc282E583'
                }
            }
        },
    },
    subgraphApi: 'https://api.thegraph.com/subgraphs/name/0xa8c81519/my-subgraph'
};
