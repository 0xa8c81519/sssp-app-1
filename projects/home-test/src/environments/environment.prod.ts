export const environment = {
    production: true,
    menu: [
        {
            text: "Pool 1",
            active: false,
            url: "/pool1",
            target: "_self"
        },
        {
            text: "Pool 2",
            active: false,
            url: "/pool2",
            target: "_self"
        },
        {
            text: "Stake BSLP-01",
            active: false,
            url: "/stake1",
            target: "_self"
        },
        {
            text: "Stake BSLP-02",
            active: false,
            url: "/stake2",
            target: "_self"
        }, {
            text: "Tutorial",
            active: false,
            url: "https://www.notion.so/bStable-Docs-5614b5e416bc409baf24a0e2e6ca9035",
            target: "_blank"
        }
    ],
    rpc: {
        url: 'https://bsc-dataseed.binance.org/'
    },
    pool1: {
        address: '0x9c00954a8a58f5dda8c011d6233093763f13c8da',
    },
    pool2: {
        address: '0x27f545300f7b93c1c0184979762622db043b0805'
    },
    pool3: {
        address: ''
    },
    liqudityFarmingProxy: {
        address: ''
    },
    bstToken: {
        address: ''
    },
    paymentFarmingProxy: {
        address: ''
    },
    dai: {
        address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3'
    },
    busd: {
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56'
    },
    usdt: {
        address: '0x55d398326f99059ff775485246999027b3197955'
    },
    qusd: {
        address: '0xb8c540d00dd0bf76ea12e4b4b95efc90804f924e'
    },
    usdc: {
        address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'
    }
};
