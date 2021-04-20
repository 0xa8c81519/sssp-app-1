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
    slippageNum;

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
        this.boot.walletReady.subscribe(res => {
            this.updateApproveStatus();
        });
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

    chooseLeft(val) {
        this.left = val;
        if (this.left === this.right) {
            if (this.right !== 2) {
                this.right = this.right + 1;
            } else {
                this.right = 0;
            }
        }
        this.boot.getExchangeOutAmt(Number(this.left), Number(this.right), this.amt).then(res => {
            this.minAmt = res.toFixed(4, BigNumber.ROUND_UP);
        });
    }

    chooseRight(val) {
        this.right = val;
        if (this.left === this.right) {
            if (this.left !== 2) {
                this.left = this.right + 1;
            } else {
                this.left = 0;
            }
        }
        this.boot.getExchangeOutAmt(Number(this.left), Number(this.right), this.amt).then(res => {
            this.minAmt = res.toFixed(4, BigNumber.ROUND_UP);
        });
    }

    approve() {
        if (this.amt) {
            this.loadStatus = LoadStatus.Loading;
            this.loading.emit();
            this.boot.approve(Number(this.left), this.amt, this.boot.poolAddress).then(() => {

            }).catch(e => {
                console.log(e);
                this.loadStatus = LoadStatus.Loaded;
                this.loaded.emit();
            });
        }
    }

    async exchange() {
        console.log(11);
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
        if (!new BigNumber(this.left).isNaN() && !new BigNumber(this.right).isNaN() && !new BigNumber(this.amt).isNaN()) {
            this.boot.getExchangeOutAmt(Number(this.left), Number(this.right), this.amt).then(res => {
                this.minAmt = res.toFixed(4, BigNumber.ROUND_DOWN);
            });
        }
        this.updateApproveStatus();
    }

    updateApproveStatus() {
        if (!new BigNumber(this.left).isNaN() && !new BigNumber(this.amt).isNaN() && this.boot.accounts && this.boot.accounts.length > 0) {
            this.boot.allowance(this.left, this.boot.poolAddress).then(amt => {
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
            false;
        }
    }

    isExchangeEnabled() {
        if (this.amt && Number(this.amt) > 0 && this.loadStatus !== LoadStatus.Loading && this.approveStatus === ApproveStatus.Approved) {
            return true;
        } else {
            return false;
        }
    }

    getFee() {
        return this.boot.poolInfo.fee.multipliedBy(100).toFixed(1, 1);
    }

    openCoinLeftDlg() {
        this.coinsDlgLeft.open(this.left);
    }

    openCoinRightDlg() {
        this.coinsDlgRight.open(this.right);
    }

    onLeftCoinSelected(selectedIndex_) {
        this.left = selectedIndex_;
        this.chooseLeft(selectedIndex_);
        this.updateApproveStatus();
    }

    onRightCoinSelected(selectedIndex_) {
        this.right = selectedIndex_;
        this.chooseRight(selectedIndex_);
    }
    otherCurrency() {
        this.isOtherCurrency = !this.isOtherCurrency;
    }
}
