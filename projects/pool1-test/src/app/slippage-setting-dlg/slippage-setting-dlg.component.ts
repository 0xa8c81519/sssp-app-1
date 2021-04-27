import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-slippage-setting-dlg',
    templateUrl: './slippage-setting-dlg.component.html',
    styleUrls: ['./slippage-setting-dlg.component.less']
})
export class SlippageSettingDlgComponent implements OnInit {

    @Output() taskData: EventEmitter<any> = new EventEmitter();
    slippageNum = null;
    active = 1;
    hidden = true;
    numList: any = [
        {num: 1},
        {num: 3},
        {num: 5},
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
            this.active = 1;
        }, 200);
    }

    selectNumFn(index) {
        this.active = index;
    }

    changeSlippageNum(e) {
        this.active = e;
    }

    confirmSlippage() {
        this.taskData.emit(this.active);
        this.close();
    }
}
