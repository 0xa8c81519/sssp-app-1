import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BootService } from '../services/boot.service';

@Component({
    selector: 'app-choose-wallet-dlg',
    templateUrl: './choose-wallet-dlg.component.html',
    styleUrls: ['./choose-wallet-dlg.component.less']
})
export class ChooseWalletDlgComponent implements OnInit {

    hidden = false;

    constructor(public boot: BootService, public dialogRef: MatDialogRef<ChooseWalletDlgComponent>) { }

    ngOnInit(): void {
    }

    connectWC() {
        this.dialogRef.close();
        this.boot.connectWC();
    }

    connectBinance() {
        this.dialogRef.close();
        this.boot.connectBinance();
    }

    connectMetaMask() {
        this.dialogRef.close();
        this.boot.connentMetaMask();
    }

    open() {
        this.hidden = false;
    }

    close() {
        this.hidden = true;
    }

}
