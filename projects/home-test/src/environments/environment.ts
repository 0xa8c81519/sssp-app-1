// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
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
            text: "Pool 3",
            active: false,
            url: "/pool3",
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
        },
        {
            text: "Stake BSLP-03",
            active: false,
            url: "/stake3",
            target: "_self"
        },
        {
            text: "Docs",
            active: false,
            url: "https://www.notion.so/bStable-Docs-5614b5e416bc409baf24a0e2e6ca9035",
            target: "_blank"
        }
    ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
