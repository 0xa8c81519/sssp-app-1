import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BootService } from '../services/boot.service';

@Component({
    selector: 'app-get-paid-to-pay',
    templateUrl: './get-paid-to-pay.component.html',
    styleUrls: ['./get-paid-to-pay.component.less']
})
export class GetPaidToPayComponent implements OnInit {

    @Output() loading: EventEmitter<any> = new EventEmitter();
    @Output() loaded: EventEmitter<any> = new EventEmitter();
    constructor(public boot: BootService) { }

    ngOnInit(): void {
    }

    claim() {
        this.loading.emit();
        this.boot.withdrawReward().then(res => {
            this.loaded.emit();
        });
    }



}
