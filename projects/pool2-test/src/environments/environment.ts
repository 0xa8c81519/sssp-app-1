export const environment = {
    production: false,
    poolId: "p2",
    liquiditySymbol: "BSLP-02",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'aBTC' }, { symbol: 'bBTC' }, { symbol: 'cBTC' }],
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
                pid: 1
            }
        },
    },
    subgraphApi: "https://api.thegraph.com/subgraphs/name/0xa8c81519/my-subgraph"
};
