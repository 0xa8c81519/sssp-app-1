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

    rightAmt: string = '0';
    address: string = '';

    approveStatus: ApproveStatus = ApproveStatus.None;
    approveStatusRight: ApproveStatus = ApproveStatus.None;

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
                this.updateApproveStatusRight();
            });
        });
    }

    ngOnInit(): void {
        this.boot.approvalStatusChange.subscribe(() => {
            this.loaded.emit();
            this.updateApproveStatus();
            this.updateApproveStatusRight();
            this.loadStatus = LoadStatus.Loaded;
        });
        this.boot.balanceChange.subscribe(() => {
            this.loaded.emit();
            this.loadStatus = LoadStatus.Loaded;
            this.updateApproveStatus();
            this.updateApproveStatusRight();
        });
    }

    approve() {
        if (this.amt) {
            this.loadStatus = LoadStatus.Loading;
            this.loading.emit();
            this.boot.approve(Number(this.left), this.amt, this.boot.paymentContract.address).then((res) => {
                if (!res) {
                    this.loadStatus = LoadStatus.Loaded;
                    this.loaded.emit();
                }
            }).catch(e => {
                console.log(e);
                this.loadStatus = LoadStatus.Loaded;
                this.loaded.emit();
            });
        }
    }

    approveRight() {
        if (this.rightAmt) {
            this.loadStatus = LoadStatus.Loading;
            this.loading.emit();
            this.boot.approve(Number(this.right), this.rightAmt, this.boot.paymentContract.address).then((res) => {
                if (!res) {
                    this.loadStatus = LoadStatus.Loaded;
                    this.loaded.emit();
                }
            }).catch(e => {
                console.log(e);
                this.loadStatus = LoadStatus.Loaded;
                this.loaded.emit();
            });
        }
    }

    pay() {
        if (this.amt && this.address && this.isExchangeEnabled()) {
            this.loading.emit();
            this.loadStatus = LoadStatus.Loading;
            this.boot.pay(Number(this.left), this.address, this.amt).then((res) => {
                console.log(res);
                if (!res) {
                    this.loaded.emit();
                    this.loadStatus = LoadStatus.Loaded;
                    this.updateApproveStatus();
                }
                this.isExchangeEnabled();
            }).catch(e => {
                this.loaded.emit();
                this.loadStatus = LoadStatus.Loaded;
                this.updateApproveStatus();
            });
        }
    }

    payRight() {
        if (this.rightAmt && this.address && this.isExchangeEnabledRight()) {
            this.loading.emit();
            this.loadStatus = LoadStatus.Loading;
            this.boot.payWithSwap(Number(this.right), Number(this.left), this.rightAmt, this.amt, this.address).then((res) => {
                if (!res) {
                    this.loaded.emit();
                    this.loadStatus = LoadStatus.Loaded;
                    this.updateApproveStatusRight();
                }
                this.isExchangeEnabledRight();
            }).catch(e => {
                this.loaded.emit();
                this.loadStatus = LoadStatus.Loaded;
                this.updateApproveStatusRight();
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
            this.rightAmt = '0';
        }
    }

    amtChangedRight(val) {
        this.rightAmt = val;
        this.updateApproveStatusRight();
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

    updateApproveStatusRight() {
        if (!new BigNumber(this.right).isNaN() && !new BigNumber(this.rightAmt).isNaN() && this.boot.accounts && this.boot.accounts.length > 0) {
            this.boot.allowance(this.right, this.boot.paymentContract.address).then(amt => {
                if (amt.comparedTo(new BigNumber(this.rightAmt)) >= 0) {
                    this.approveStatusRight = ApproveStatus.Approved;
                } else {
                    this.approveStatusRight = ApproveStatus.NoApproved;
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
        if (this.rightAmt && Number(this.rightAmt) > 0 && this.approveStatusRight === ApproveStatus.NoApproved && this.loadStatus !== LoadStatus.Loading) {
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
        if (this.rightAmt && Number(this.rightAmt) > 0 && this.loadStatus !== LoadStatus.Loading && this.approveStatusRight === ApproveStatus.Approved) {
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
        this.updateApproveStatusRight();
    }

    selectNumFn(index) {
        this.active = index;
        this.calcNum();
    }

    calcNum() {
        this.rightAmt = new BigNumber(this.amt).multipliedBy(new BigNumber(1).plus(new BigNumber(this.active).div(100))).toFixed(4, BigNumber.ROUND_DOWN);
    }

    editAddress(v) {
        this.address = v;
    }
}
