import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-wallet-item',
    templateUrl: './wallet-item.component.html',
    styleUrls: ['./wallet-item.component.less']
})
export class WalletItemComponent implements OnInit {

    @Input('index')
    index;

    @Input('isMobile')
    isMobile = false;

    @Output('onMouseEnter')
    mouseEnter: EventEmitter<any> = new EventEmitter();
    @Output('onMouseLeave')
    mouseLeave: EventEmitter<any> = new EventEmitter();
    mouseOn = false;

    constructor() { }

    ngOnInit(): void {
    }

    onLiMouseEnter() {
        this.mouseOn = true;
        this.mouseEnter.emit({ index: this.index });
    }

    onLiMouseLeave() {
        this.mouseOn = false;
        this.mouseLeave.emit({ index: this.index });
    }

}
