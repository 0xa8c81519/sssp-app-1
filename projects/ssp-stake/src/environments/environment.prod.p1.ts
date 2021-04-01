export const environment = {
    production: true,
    poolId: "p1",
    liquiditySymbol: "BSLP-01",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'DAI' }, { symbol: 'BUSD' }, { symbol: 'USDT' }],
    menuIndex: 2,
    tabName: "Stake & Reward of Pool1",
    chains: {
        56: {
            enabled: true,
            name: 'BSC Mainnet',
            rpc: 'https://bsc-dataseed.binance.org/',
            contracts: {
                coins: [
                    { symbol: 'DAI', address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3' },
                    { symbol: 'BUSD', address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' },
                    { symbol: 'USDT', address: '0x55d398326f99059ff775485246999027b3197955' },
                ],
                Pool: {
                    address: '0x9c00954a8a58f5dda8c011d6233093763f13c8da',
                }
            }
        },
        97: {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                coins: [
                    { symbol: 'DAI', address: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867' },
                    { symbol: 'BUSD', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'USDT', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x936EaEB69174e9f67b07213890DF8E0c29A71c83',
                }
            }
        },
        "Binance-Chain-Ganges": {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                coins: [
                    { symbol: 'DAI', address: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867' },
                    { symbol: 'BUSD', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'USDT', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x936EaEB69174e9f67b07213890DF8E0c29A71c83',
                }
            }
        }
    },
};
