import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import BigNumber from 'bignumber.js';
import {CoinsDlgComponent} from '../coins-dlg/coins-dlg.component';
import {BootService} from '../services/boot.service';
import {ethers} from 'ethers';

export enum ApproveStatus {
    None, Approved, NoApproved
}

export enum LoadStatus {
    None, Loading, Loaded
}

@Component({
    selector: 'app-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.less']
})
export class PaymentInfoComponent implements OnInit {
    @Input('hidden')
    hidden = false;

    left = 0;
    active = 1;
    slippageNumList: any = [
        {num: 1},
        {num: 2},
        {num: 5}
    ];

    right = 1;

    balance: BigNumber;

    amt = '0';

    isOtherCurrency: boolean = false;

    minAmt: string = '0';
    address: string = '';

    approveStatus: ApproveStatus = ApproveStatus.None;

    loadStatus: LoadStatus = LoadStatus.None;

    @Output() loading: EventEmitter<any> = new EventEmitter();
    @Output() loaded: EventEmitter<any> = new EventEmitter();
    @Output('chooseWallet') chooseWlt = new EventEmitter();
    @Output('installWallet') installWlt = new EventEmitter();

    @ViewChild('coinsDlgLeft')
    coinsDlgLeft: CoinsDlgComponent;

    @ViewChild('coinsDlgRight')
    coinsDlgRight: CoinsDlgComponent;

    constructor(public boot: BootService, private dialog: MatDialog) {
        this.boot.initContractsCompleted.subscribe(res => {
            this.boot.approvalStatusChange.subscribe(res => {
                this.updateApproveStatus();
            });
        });
    }

    ngOnInit(): void {
        this.boot.approvalStatusChange.subscribe(() => {
            this.loaded.emit();
            this.updateApproveStatus();
            this.loadStatus = LoadStatus.Loaded;
        });
        this.boot.balanceChange.subscribe(() => {
            this.loaded.emit();
            this.loadStatus = LoadStatus.Loaded;
            this.updateApproveStatus();
        });
    }

    approve() {
        if (this.amt) {
            this.loadStatus = LoadStatus.Loading;
            this.loading.emit();
            this.boot.approve(Number(this.left), this.amt, this.boot.paymentContract.address).then(() => {

            }).catch(e => {
                console.log(e);
                this.loadStatus = LoadStatus.Loaded;
                this.loaded.emit();
            });
        }
    }

    approveRight() {
        if (this.minAmt) {
            this.loadStatus = LoadStatus.Loading;
            this.loading.emit();
            this.boot.approve(Number(this.right), this.minAmt, this.boot.paymentContract.address).then(() => {

            }).catch(e => {
                console.log(e);
                this.loadStatus = LoadStatus.Loaded;
                this.loaded.emit();
            });
        }
    }

    exchange() {
        console.log(11);
        if (this.amt && this.address && this.isExchangeEnabled()) {
            this.loading.emit();
            this.loadStatus = LoadStatus.Loading;
            this.boot.pay(Number(this.left), this.address, this.amt).then((res) => {
                console.log(res);
            }).catch(e => {
                this.loaded.emit();
                this.loadStatus = LoadStatus.Loaded;
                this.updateApproveStatus();
            });
        }
    }

    exchangeRight() {
        console.log(12);
        if (this.minAmt && this.address && this.isExchangeEnabledRight()) {
            this.loading.emit();
            this.loadStatus = LoadStatus.Loading;
            this.boot.payWithSwap(Number(this.right), Number(this.left), this.minAmt, this.amt, this.address).then((res) => {
                console.log(res);
            }).catch(e => {
                this.loaded.emit();
                this.loadStatus = LoadStatus.Loaded;
                this.updateApproveStatus();
            });
        }
    }

    // leftClick(i) {
    //     this.left = i;
    // }

    // rightClick(i) {
    //     this.right = i;
    // }

    public async connectWallet() {
        if (!this.boot.isMetaMaskInstalled() && !this.boot.isBinanceInstalled()) {
            this.installWlt.emit();
            return;
        } else {
            this.chooseWallet();
        }
    }

    chooseWallet() {
        this.chooseWlt.emit();
    }

    amtChanged(val) {
        this.amt = val;
        this.updateApproveStatus();
        if (this.amt && this.amt !== '' && this.amt !== '0') {
            this.calcNum();
        } else {
            this.isOtherCurrency = false;
            this.minAmt = '0';
        }
    }

    amtChangedRight(val) {
        this.minAmt = val;
        this.updateApproveStatus();
    }

    updateApproveStatus() {
        if (!new BigNumber(this.left).isNaN() && !new BigNumber(this.amt).isNaN() && this.boot.accounts && this.boot.accounts.length > 0) {
            this.boot.allowance(this.left, this.boot.paymentContract.address).then(amt => {
                if (amt.comparedTo(new BigNumber(this.amt)) >= 0) {
                    this.approveStatus = ApproveStatus.Approved;
                } else {
                    this.approveStatus = ApproveStatus.NoApproved;
                }
            });
        }
    }

    isApproveEnabled() {
        if (this.amt && Number(this.amt) > 0 && this.approveStatus === ApproveStatus.NoApproved && this.loadStatus !== LoadStatus.Loading) {
            return true;
        } else {
            return false;
        }
    }

    isApproveEnabledRight() {
        if (this.minAmt && Number(this.minAmt) > 0 && this.approveStatus === ApproveStatus.NoApproved && this.loadStatus !== LoadStatus.Loading) {
            return true;
        } else {
            return false;
        }
    }

    isExchangeEnabled() {
        if (this.amt && Number(this.amt) > 0 && this.loadStatus !== LoadStatus.Loading && this.approveStatus === ApproveStatus.Approved) {
            return true;
        } else {
            return false;
        }
    }

    isExchangeEnabledRight() {
        if (this.minAmt && Number(this.minAmt) > 0 && this.loadStatus !== LoadStatus.Loading && this.approveStatus === ApproveStatus.Approved) {
            return true;
        } else {
            return false;
        }
    }

    onLeftCoinSelected(selectedIndex_) {
        this.left = selectedIndex_;
        //this.chooseLeft(selectedIndex_);
        this.updateApproveStatus();
    }

    onRightCoinSelected(selectedIndex_) {
        this.right = selectedIndex_;
        //this.chooseRight(selectedIndex_);
        this.updateApproveStatus();
    }


    chooseLeft(val) {
        this.left = val;
        if (this.left === this.right) {
            if (this.right !== 2) {
                this.right = this.right + 1;
            } else {
                this.right = 0;
            }
        }
    }

    openCoinLeftDlg() {
        this.coinsDlgLeft.open(this.left);
    }

    openCoinRightDlg() {
        this.coinsDlgRight.open(this.right);
    }

    otherCurrency() {
        if (Number(this.amt) > 0 && !this.isOtherCurrency) {
            this.calcNum();
            this.isOtherCurrency = !this.isOtherCurrency;
        } else {
            this.isOtherCurrency = false;
            return;
        }
    }

    selectNumFn(index) {
        this.active = index;
        this.calcNum();
    }

    calcNum() {
        this.minAmt = (Number(this.amt) + this.active).toString();
    }

    editAddress(v) {
        this.address = v;
    }
}
