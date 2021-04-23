import {
    ApplicationRef,
    Injectable
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import WalletConnectProvider from '@walletconnect/web3-provider';
import {LocalStorageService} from 'angular-web-storage';
import {BigNumber} from 'bignumber.js';
import {ethers} from 'ethers';
import {Observable, Subject} from 'rxjs';
import BStablePool from '../../abi/BStablePool.json';
import BStableProxyV2 from '../../abi/BStableProxyV2.json';
import BStableTokenV2 from '../../abi/BStableTokenV2.json';
import BStablePayment from '../../abi/BStablePayment.json';
import PaymentToken from '../../abi/PaymentToken.json';
import BEP20 from '../../abi/BEP20.json';
import {environment} from '../../environments/environment';
import {ApproveDlgComponent} from '../approve-dlg/approve-dlg.component';
import {ConstVal} from '../model/const-val';
import {UnsupportedNetworkComponent} from '../unsupported-network/unsupported-network.component';
import {WalletExceptionDlgComponent} from '../wallet-exception-dlg/wallet-exception-dlg.component';

@Injectable({
    providedIn: 'root'
})
export class BootService {

    walletReady: Subject<any> = new Subject();
    initContractsCompleted: Subject<any> = new Subject();

    poolId = environment.poolId;
    coins = environment.coins;
    web3: ethers.providers.Web3Provider;
    binanceWeb3: ethers.providers.Web3Provider;
    metamaskWeb3: ethers.providers.Web3Provider;
    wcWeb3: ethers.providers.Web3Provider;
    accounts: string[] = new Array();

    poolContract: ethers.Contract;

    paymentContract: ethers.Contract;
    paymentTokenContract: ethers.Contract;

    contracts: Array<ethers.Contract> = new Array();

    chainConfig: any;
    unSupportedNetworkSubject: Subject<any> = new Subject();
    chainId: string;
    wcProvider: WalletConnectProvider;

    virtualPrice: BigNumber;

    //Obserable
    accountsChanged: Observable<any>;
    chainChanged: Observable<any>;
    connected: Observable<any>;
    disconnected: Observable<any>;

    approvalStatusChange: Subject<any> = new Subject();
    lpApprovalStatusChange: Subject<any> = new Subject();
    balanceChange: Subject<any> = new Subject();

    // three coins' balance
    balances: BigNumber[] = [];

    public denominator = new BigNumber(10).exponentiatedBy(18);


    constructor(private dialog: MatDialog, private applicationRef: ApplicationRef, private localStorage: LocalStorageService) {
        environment.coins.forEach(e => {
            this.balances.push(new BigNumber(0));
        });
        if (this.isMetaMaskInstalled()) {
            // @ts-ignore
            this.metamaskWeb3 = new ethers.providers.Web3Provider(window.ethereum);
        }
        if (this.isBinanceInstalled()) {
            // @ts-ignore
            this.binanceWeb3 = new ethers.providers.Web3Provider(window.BinanceChain);
        }
        this.wcProvider = new WalletConnectProvider({
            // infuraId: "a1b8fe06fc1349b1b812bdb7b8f79465",
            rpc: {
                // @ts-ignore
                56: environment.rpc[56],
                // @ts-ignore
                97: environment.rpc[97],
            },
        });
    }

    isMetaMaskInstalled() {
        //@ts-ignore
        return window.ethereum && window.ethereum.isMetaMask;
    }

    isBinanceInstalled() {
        // @ts-ignore
        return window.BinanceChain ? true : false;
    }


    private initContracts(): Promise<any> {
        this.paymentContract = new ethers.Contract(this.chainConfig.contracts.payment.address, BStablePayment.abi, this.web3);
        return this.paymentContract.pool().then(poolAddress => {
            this.poolContract = new ethers.Contract(poolAddress, BStablePool.abi, this.web3);
            let pArr_0 = new Array();
            for (let i = 0; i < environment.coins.length; i++) {
                pArr_0.push(this.poolContract.coins(i));
            }
            return Promise.all(pArr_0).then(coins => {
                for (let i = 0; i < coins.length; i++) {
                    let coinContract = new ethers.Contract(coins[i], BEP20.abi, this.web3);
                    let filter_0 = coinContract.filters.Approval(this.accounts[0], null, null);
                    coinContract.on(filter_0, (owner, spender, amount, event) => {
                        this.approvalStatusChange.next({index: i, owner: owner, spender: spender, amount: amount});
                    });
                    let filter_1 = coinContract.filters.Transfer(this.accounts[0], null, null);
                    coinContract.on(filter_1, (from, to, amt) => {
                        this.loadData();
                        this.balanceChange.next();
                    });
                    let filter_2 = coinContract.filters.Transfer(null, this.accounts[0], null);
                    coinContract.on(filter_2, (from, to, amt) => {
                        this.loadData();
                        this.balanceChange.next();
                    });
                    this.contracts.push(coinContract);
                }
            });
        }).then(() => {
            return this.paymentContract.paymentToken().then(paymentTokenAddress => {
                this.paymentTokenContract = new ethers.Contract(paymentTokenAddress, PaymentToken.abi, this.web3);
            });
        });
    }

    public getNetworkInfo(provider: any, _chainId?: string): Promise<any> {
        let chainId;
        if (!_chainId) {
            return this.web3.getNetwork().then(network => {
                chainId = network.chainId;
                this.chainConfig = environment.chains[chainId];
                if (!this.chainConfig || !this.chainConfig.enabled) {
                    return {isSupported: false, chainId: chainId, config: this.chainConfig};
                } else {
                    return {isSupported: true, chainId: chainId, config: this.chainConfig};
                }
            });
        } else {
            chainId = _chainId;
            return new Promise((resolve, reject) => {
                this.chainConfig = environment.chains[chainId];
                if (!this.chainConfig || !this.chainConfig.enabled) {
                    resolve({isSupported: false, chainId: chainId, config: this.chainConfig});
                } else {
                    resolve({isSupported: true, chainId: chainId, config: this.chainConfig});
                }
            });
        }
    }

    private initProviderEvent(provider: any) {
        this.accountsChanged = new Observable((observer) => {
            provider.on('accountsChanged', async (accounts: string[]) => {
                observer.next(accounts);
            });
        });
        this.accountsChanged.subscribe(async (accounts: string[]) => {
            console.log('accounts: ' + accounts);
            if (accounts.length > 0) {
                this.accounts = accounts;
                this.loadData();
            } else {
                this.accounts = accounts;
            }
            this.applicationRef.tick();
        });

        this.chainChanged = new Observable((observer) => {
            provider.on('chainChanged', async (chainId: string) => {
                observer.next(chainId);
            });
        });
        this.chainChanged.subscribe(async (chainId: string) => {
            console.log('chainId: ' + chainId);
            chainId = String(chainId);
            let networkInfo = await this.getNetworkInfo(chainId);
            if (networkInfo.isSupported) {
                this.chainConfig = environment.chains[chainId];
                this.chainId = chainId;
                this.initContracts().then(() => {
                    this.loadData();
                });
            } else {
                if (!provider.isMetaMask) {
                    this.dialog.open(UnsupportedNetworkComponent, {data: {chainId: chainId}});
                }
            }
            this.applicationRef.tick();
        });

        // Subscribe to session connection
        this.connected = new Observable((observer) => {
            provider.on('connect', () => {
                observer.next();
            });
        });
        this.connected.subscribe((info) => {
            console.log('connect!');
            console.log(info);
            this.applicationRef.tick();
        });

        // Subscribe to session disconnection
        this.disconnected = new Observable((observer) => {
            provider.on('disconnect', (code: number, reason: string) => {
                observer.next({code: code, reason: reason});
            });
        });
        this.disconnected.subscribe((res: any) => {
            console.log('disconnect!');
            console.log(res);
            window.location.reload();
        });
    }

    /**
     * connect to wallet connect
     */
    public connectWC() {

        // Subscribe to session connection
        this.wcProvider.on('connect', async () => {
            console.log('WalletConnect connect');

        });
        // Subscribe to session disconnection
        this.wcProvider.on('disconnect', (code: number, reason: string) => {
            console.log(code, reason);
        });
        //  Enable session (triggers QR Code modal)
        this.wcProvider.enable().then(res => {
            console.log(res);
            if (res && res.length > 0) {
                this.accounts = res;
                this.wcWeb3 = new ethers.providers.Web3Provider(this.wcProvider);
                this.web3 = this.wcWeb3;
                this.initProviderEvent(this.wcProvider);
                this.getNetworkInfo(this.wcProvider).then(networkInfo => {
                    if (networkInfo.isSupported) {
                        this.chainConfig = networkInfo.config;
                        this.chainId = networkInfo.chainId;
                        this.walletReady.next();
                        this.initContracts().then(() => {
                            this.loadData();
                        });
                    } else {
                        this.dialog.open(UnsupportedNetworkComponent, {data: {chainId: networkInfo.chainId}});
                        return;
                    }
                });
            }
        }).catch(e => {
            // @ts-ignore
            // this.wcWeb3 = new Web3_1_2(this.wcProvider);
            // this.web3 = this.wcWeb3;
            window.location.reload();
            console.log(e);
        });

    }

    public connentMetaMask() {
        if (this.isMetaMaskInstalled()) {
            //@ts-ignore
            window.ethereum.request({method: 'eth_requestAccounts', param: []}).then(() => {
                // @ts-ignore
                this.metamaskWeb3 = new ethers.providers.Web3Provider(window.ethereum);
                this.web3 = this.metamaskWeb3;
                this.localStorage.set(ConstVal.KEY_WEB3_TYPE, 'metamask');
                // @ts-ignore
                this.initProviderEvent(window.ethereum);
                // @ts-ignore
                this.getNetworkInfo(window.ethereum).then(networkInfo => {
                    if (!networkInfo.isSupported) {
                        this.dialog.open(UnsupportedNetworkComponent, {data: {chainId: networkInfo.chainId}});
                        return;
                    } else {
                        // @ts-ignore
                        window.ethereum.request({method: 'eth_accounts', parma: []}).then(accounts => {
                            this.accounts = accounts;
                            this.walletReady.next();
                            this.initContracts().then(() => {
                                this.loadData();
                            });
                        });
                    }
                });
            });
        }
    }

    public connectBinance() {
        if (this.isBinanceInstalled()) {
            // @ts-ignore
            window.BinanceChain.request({method: 'eth_requestAccounts', param: []}).then(() => {
                // @ts-ignore
                this.binanceWeb3 = new ethers.providers.Web3Provider(window.BinanceChain);
                this.web3 = this.binanceWeb3;
                this.localStorage.set(ConstVal.KEY_WEB3_TYPE, 'binance');
                // @ts-ignore
                this.initProviderEvent(window.BinanceChain);
                // @ts-ignore
                this.getNetworkInfo(window.BinanceChain).then(networkInfo => {
                    if (!networkInfo.isSupported) {
                        this.dialog.open(UnsupportedNetworkComponent, {data: {chainId: networkInfo.chainId}});
                        return;
                    } else {
                        // @ts-ignore
                        window.BinanceChain.request({method: 'eth_accounts', parma: []}).then(accounts => {
                            this.accounts = accounts;
                            this.walletReady.next();
                            this.initContracts().then(() => {
                                this.loadData();
                            });
                        });
                    }
                });
            });
        }
    }

    public loadData() {
        let pArr = new Array();
        this.contracts.forEach((coin, i) => {
            pArr.push(coin.balanceOf(this.accounts[0]));
        });
        return Promise.all(pArr).then(res => {
            res.forEach((e, i) => {
                this.balances[i] = new BigNumber(e.toString()).div(this.denominator);
            });
        });
    }

    public async allowance(i, address: string): Promise<BigNumber> {
        if (this.chainConfig && this.contracts && this.contracts.length > 0 && this.accounts && this.accounts.length > 0) {
            let decimals = await this.contracts[i].decimals({from: this.accounts[0]});
            return this.contracts[i].allowance(this.accounts[0], address).then((res) => {
                return new BigNumber(res.toString()).div(new BigNumber(10).exponentiatedBy(decimals));
            });
        } else {
            return new Promise((resolve, reject) => {
                resolve(new BigNumber(0));
            });
        }

    }

    public approve(i: number, amt: string, spender: string): Promise<any> {
        let dialogRef = this.dialog.open(ApproveDlgComponent, {data: {amt: amt, symbol: this.coins[i].symbol}});
        return dialogRef.afterClosed().toPromise().then(async res => {
            let amt;
            if (res && res.continu && res.infinite === true) {
                amt = new BigNumber(2).exponentiatedBy(256).minus(1).toFixed(0);
            } else if (res && res.continu && res.infinite === false) {
                amt = res.amt;
                amt = ethers.utils.parseEther(String(amt)).toString();
            } else {
                return new Promise((resolve, reject) => {
                    resolve(true);
                });
            }
            console.log(amt);
            return this.contracts[i].estimateGas.approve(spender, amt, {from: this.accounts[0]}).then(gas => {
                let signer = this.web3.getSigner();
                return this.contracts[i].connect(signer).approve(spender, amt, {from: this.accounts[0], gasLimit: gas.toString()});
            });
        });
    }

    public async getExchangeOutAmt(i: number, j: number, amt: string) {
        if (this.poolContract && !new BigNumber(amt).isNaN()) {
            amt = ethers.utils.parseEther(String(amt)).toString();
            let decimals = await this.contracts[j].decimals({from: this.accounts[0]});
            return this.poolContract.get_dy(i, j, amt).then((res) => {
                return new BigNumber(res.toString()).div(new BigNumber(10).exponentiatedBy(decimals.toString()));
            });
        } else {
            return new Promise((resolve, reject) => {
                resolve(new BigNumber(0));
            });
        }
    }

    /**
     *
     * @param i the index of token to pay
     * @param receipt receipt address
     * @param amt amount
     * @returns
     */
    public pay(i: number, receipt: string, amt: string): Promise<any> {
        return this.paymentContract.estimateGas.pay(this.contracts[i].address, receipt, amt).then(gas => {
            let signer = this.web3.getSigner();
            return this.paymentContract.connect(signer).pay(this.contracts[i].address, receipt, amt, {gasLimit: gas.toString});
        }).catch(e => {
            this.dialog.open(WalletExceptionDlgComponent, {data: {content: 'exchange_exception'}});
            console.log(e);
        });
    }

    /**
     *
     * @param i the index of token to pay
     * @param j the index of token receipt will receive.
     * @param payAmt the amount will be paid acctually. payAmt = receiptAmt * slippage
     * @param receiptAmt the amout the receipt will receive.
     * @param receipt
     * @returns
     */
    public payWithSwap(i: number, j: number, payAmt: string, receiptAmt: string, receipt: string): Promise<any> {
        return this.paymentContract.estimateGas.payWithSwap(this.contracts[i].address, this.contracts[j].address, payAmt, receiptAmt, receipt).then(gas => {
            return this.paymentContract.payWithSwap(this.contracts[i].address, this.contracts[j].address, payAmt, receiptAmt, receipt, {gasLimit: gas});
        }).catch(e => {
            this.dialog.open(WalletExceptionDlgComponent, {data: {content: 'exchange_exception'}});
            console.log(e);
        });
    }
}
