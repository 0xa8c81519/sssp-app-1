export const environment = {
    production: true,
    poolId: "p3",
    liquiditySymbol: "BSLP-03",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'QUSD' }, { symbol: 'DAI' }, { symbol: 'VAI' }],
    menuIndex: 2,
    tabName: "Stake & Reward of Pool1",
    chains: {
        56: {
            enabled: false,
            name: 'BSC Mainnet',
            rpc: 'https://bsc-dataseed.binance.org/',
            contracts: {
                coins: [
                    { symbol: 'QUSD', address: '0x43B8ad974F49553dd4f5f3cB534A368fbC4761DB' },
                    { symbol: 'DAI', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'VAI', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x8d39200EC87d3fb37fdfFe3C11dc103A9D71CD14',
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
                    { symbol: 'DAI', address: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867' },
                    { symbol: 'VAI', address: '0x0a87c5bdec19d74bee9938f928bfa153bc8532b2' },
                ],
                Pool: {
                    address: '0x8d39200EC87d3fb37fdfFe3C11dc103A9D71CD14',
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
                    { symbol: 'DAI', address: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867' },
                    { symbol: 'VAI', address: '0x0a87c5bdec19d74bee9938f928bfa153bc8532b2' },
                ],
                Pool: {
                    address: '0x8d39200EC87d3fb37fdfFe3C11dc103A9D71CD14',
                }
            }
        }
    },
};
