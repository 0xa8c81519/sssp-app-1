import { Component, ViewChild } from '@angular/core';
import { BootService } from './services/boot.service';
import { HeaderComponent, LanguageService } from 'app-lib';
import { MatDialog } from '@angular/material/dialog';
import { ChooseWalletDlgComponent } from './choose-wallet-dlg/choose-wallet-dlg.component';
import { IntallWalletDlgComponent } from './intall-wallet-dlg/intall-wallet-dlg.component';
import { LocalStorageService } from 'angular-web-storage';
import { ConstVal } from './model/const-val';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'sssp-app';

    curTab = 0;

    @ViewChild('header')
    header: HeaderComponent;

    constructor(public boot: BootService, public lang: LanguageService, private dialog: MatDialog, private localStorage: LocalStorageService) {
        if (this.boot.isMetaMaskInstalled() || this.boot.isBinanceInstalled()) {
            let wallet = this.localStorage.get(ConstVal.KEY_WEB3_TYPE);
            if (wallet && wallet === 'walletconnect') {
                this.boot.connectWC();
            } else if (wallet && wallet === 'metamask') {
                this.boot.connentMetaMask();
            } else if (wallet === 'binance') {
                setTimeout(() => {
                    this.boot.connectBinance();
                }, 1000);
            } else {
                this.chooseWallet();
            }
        }
    }



    changeTab(tab) {
        this.curTab = tab;
    }

    chooseWallet() {
        let dlgRef = this.dialog.open(ChooseWalletDlgComponent, { width: '30em' });
        dlgRef.afterClosed().toPromise().then(res => {
            this.header.onLoaded();
        });
    }

    public async connectWallet() {
        if (!this.boot.isMetaMaskInstalled() && !this.boot.isBinanceInstalled()) {
            this.dialog.open(IntallWalletDlgComponent, { width: '30em' });
            return;
        } else {
            this.chooseWallet();
        }
    }

    public getVpDiff() {
        let r = this.boot.poolInfo.virtualPrice.minus(1).multipliedBy(100).abs();
        if (r.comparedTo(100) === 0) {
            return null;
        } else {
            return r;
        }
    }



}
