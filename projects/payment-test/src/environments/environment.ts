import { common } from 'libs/common/com.evn';
export const environment = {
    production: false,
    poolId: 'pay',
    paymentTokenSymbol: 'BSPT',
    tokenSymbol: 'BST',
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'tUSDC' }, { symbol: 'tBUSD' }, { symbol: 'tUSDT' }],
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
                    address: common.proxy.address
                },
                payment: {
                    address: common.payment.address
                }
            }
        },
    },
    subgraphApi: 'https://api.thegraph.com/subgraphs/name/0xa8c81519/my-subgraph'
};
