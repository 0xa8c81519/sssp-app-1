// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    menu: [
        {
            text: 'Pay',
            active: false,
            url: '/payment',
            target: '_self'
        },
        {
            text: 'Pool 1',
            active: false,
            url: '/pool1',
            target: '_self'
        },
        {
            text: 'Pool 2',
            active: false,
            url: '/pool2',
            target: '_self'
        },
        {
            text: 'Pool 3',
            active: false,
            url: '/pool3',
            target: '_self'
        },
        {
            text: 'Stake BSLP-01',
            active: false,
            url: '/stake1',
            target: '_self'
        },
        {
            text: 'Stake BSLP-02',
            active: false,
            url: '/stake2',
            target: '_self'
        },
        {
            text: 'Stake BSLP-03',
            active: false,
            url: '/stake3',
            target: '_self'
        },
        {
            text: 'Docs',
            active: false,
            url: 'https://docs.bstable.finance',
            target: '_blank'
        }
    ],
    rpc: {
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    },
    pool1: {
        address: '0x7B095E6eaA969F9f840Ccacb9DE89516DE2FC52E',
    },
    pool2: {
        address: '0x2552c1801d9891Fbf56Ea5Cf5AC61089a1D1c1d8'
    },
    pool3: {
        address: '0xb16db5A5ca679ee6b9e0AcB2C22DcF04Db5F652b'
    },
    liqudityFarmingProxy: {
        address: '0xeaFdd54940b518FE1E9Eb90DB7c3cE3706E4D491'
    },
    bstToken: {
        address: '0x350730f67dd98A1F1aBB3aab82c554c3769dee78'
    },
    paymentFarmingProxy: {
        address: '0xAD3AC3A9F848C6d0900A09078bb93aB8474C2898'
    },
    dai: {
        address: '0xb86fCC4e6189BD298dD606d174266cA938606D09'
    },
    busd: {
        address: '0xa2157E2Ca201a157776494Cbd02723A121359794'
    },
    usdt: {
        address: '0xD94905fc832754Ea85bCa67C6Ab5FAa66066E12C'
    },
    qusd: {
        address: '0xd7c2ba36d15bfdeaa38766c231cc940ed524530f'
    },
    usdc: {
        address: '0x45374DB08D851B9Fc254d9BF0e67E1607876a7E7'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
