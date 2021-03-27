import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-coins-dlg',
    templateUrl: './coins-dlg.component.html',
    styleUrls: ['./coins-dlg.component.less']
})
export class CoinsDlgComponent implements OnInit {

    hidden = true;

    indexEnter = 0;

    indexSelected = 0;

    @ViewChild('checkedEle')
    checkedEle: ElementRef;

    isMobile = false;

    constructor(private render: Renderer2) { }

    ngOnInit(): void {
        let regEx = navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i);
        this.isMobile = regEx != null && regEx.length > 0;
    }

    open() {
        this.hidden = false;
    }

    close() {
        this.hidden = true;
    }

    onMouseEnter(index) {
        this.indexEnter = index;
        if (this.isMobile) {
            return;
        }
        let height = 50;
        let baseHight = 54;
        if (!this.isMobile) {
            height = 70;
            baseHight = 10;
        }
        this.render.setAttribute(this.checkedEle.nativeElement, 'style', `display:block;top:${baseHight + height * index}px`)
    }

    onMouseLeave(index) {
        this.indexEnter = index;
        if (this.isMobile) {
            return;
        }
        let height = 50;
        let baseHight = 54;
        if (!this.isMobile) {
            height = 70;
            baseHight = 10;
        }
        this.render.setStyle(this.checkedEle.nativeElement, 'style', `display:block;top:${baseHight + height * index}px`)

    }

    onSelectedCoin(index) {
        this.indexSelected = index;
    }

}
