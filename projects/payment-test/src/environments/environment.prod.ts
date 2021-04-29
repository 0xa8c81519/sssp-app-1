export const environment = {
    production: true,
    poolId: 'pay',
    paymentTokenSymbol: 'BSPT',
    tokenSymbol: 'BST',
    virtualPriceDiff: 0.006,
    coins: [{symbol: 'USDC'}, {symbol: 'BUSD'}, {symbol: 'USDT'}],
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
                    address: '0x3A10b311a090776ad4988D847B2Eae042ad77872'
                },
                payment: {
                    address: '0xaEF71d18D72f86DFa23A8aFC0Ec78c9C641B7ba2'
                }
            }
        },
    },
    subgraphApi: 'https://api.thegraph.com/subgraphs/name/0xa8c81519/my-subgraph'
};
