export const environment = {
    production: false,
    poolId: "p1",
    liquiditySymbol: "BSLP-01",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'tDAI' }, { symbol: 'tUSD' }, { symbol: 'tUSDT' }],
    menuIndex: 2,
    tabName: "Stake & Reward of Pool1",
    chains: {
        56: {
            enabled: false,
            name: 'Mainnet',
            rpc: 'https://bsc-dataseed.binance.org/',
            contracts: {
            }
        },
        97: {
            enabled: true,
            name: 'Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                proxy: {
                    address: "0xAcDe76E0175779088b8557a21b00F16D56651d25"
                },
                pid: 0
            }
        },
        1337: {
            enabled: true,
            name: 'DEV',
            rpc: 'http://localhost:8545/',
            contracts: {
                proxy: {
                    address: "0x133125b30ed09924FBd9a869bb4450760bD213fC"
                },
                pid: 0
            }
        },
        "Binance-Chain-Ganges": {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                proxy: {
                    address: "0xe6D92fed3b36188bD37b63C86419822Eec6e07B5"
                },
                pid: 0
            }
        }
    },
};
