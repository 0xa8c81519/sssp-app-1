export const environment = {
    production: true,
    poolId: "p2",
    liquiditySymbol: "BSLP-02",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'QUSD' }, { symbol: 'BUSD' }, { symbol: 'USDT' }],
    menuIndex: 2,
    tabName: "Stake & Reward of Pool1",
    chains: {
        56: {
            enabled: true,
            name: 'BSC Mainnet',
            rpc: 'https://bsc-dataseed.binance.org/',
            contracts: {
                coins: [
                    { symbol: 'QUSD', address: '0xb8c540d00dd0bf76ea12e4b4b95efc90804f924e' },
                    { symbol: 'BUSD', address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' },
                    { symbol: 'USDT', address: '0x55d398326f99059ff775485246999027b3197955' },
                ],
                Pool: {
                    address: '0x27f545300f7b93c1c0184979762622db043b0805',
                }
            }
        },
        97: {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                coins: [
                    { symbol: 'QUSD', address: '0x43B8ad974F49553dd4f5f3cB534A368fbC4761DB' },
                    { symbol: 'BUSD', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'USDT', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x5E9b51baf11B938D463558f6CDefDC373cBEBB16',
                }
            }
        },
        "Binance-Chain-Ganges": {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                coins: [
                    { symbol: 'QUSD', address: '0x43B8ad974F49553dd4f5f3cB534A368fbC4761DB' },
                    { symbol: 'BUSD', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'USDT', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x5E9b51baf11B938D463558f6CDefDC373cBEBB16',
                }
            }
        }
    },
};
