export const environment = {
    production: true,
    poolId: "p1",
    liquiditySymbol: "BSLP-01",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'bstDAI' }, { symbol: 'bstBUSD' }, { symbol: 'bstUSDT' }],
    chains: {
        56: {
            enabled: false,
            name: 'BSC Mainnet',
            rpc: 'https://bsc-dataseed.binance.org/',
            contracts: {
            }
        },
        97: {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                proxy: {
                    address: "0xE6e6AE6791AC27DEf268a83015Fa287Fe6874f18"
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
