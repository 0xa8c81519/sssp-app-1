import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-slippage-setting-dlg',
    templateUrl: './slippage-setting-dlg.component.html',
    styleUrls: ['./slippage-setting-dlg.component.less']
})
export class SlippageSettingDlgComponent implements OnInit {

    active = 0;
    hidden = true;
    numList: any = [
        {num: '1%'},
        {num: '3%'},
        {num: '5%'},
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    open() {
        this.hidden = false;
    }

    close() {
        setTimeout(() => {
            this.hidden = true;
        }, 200);
    }

    selectNumFn(index) {
        this.active = index;
    }
}
