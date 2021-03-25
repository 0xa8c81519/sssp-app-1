import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'app-lib';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isAndroid;
    bgcBoxMouseOn = false;
    btnMouseOn = false;
    menuMouseOn = false;
    topOpen = false;

    constructor(public lang: LanguageService) {

    }
    ngOnInit(): void {
        const isMobile = (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))
        const u = navigator.userAgent;
        this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        // todo: delete
        // if (this.isAndroid) {
        //     $('.backdrop-filter').removeClass('backdrop-filter')
        // }
    }
    onBgcBoxMouseEnter() {
        this.bgcBoxMouseOn = true;
    }

    onBgcBoxMouseLeave() {
        this.bgcBoxMouseOn = false;
    }

    onBtnMouseEnter() {
        this.btnMouseOn = true;
    }

    onBtnMouseLeave() {
        this.btnMouseOn = false;
    }

    onExchangeContMouseEnter() {
        this.btnMouseOn = true;
        this.bgcBoxMouseOn = true;
    }

    onExchangeContMouseLeave() {
        this.btnMouseOn = false;
        this.bgcBoxMouseOn = false;
    }

    onMenuMouseEnter() {
        this.menuMouseOn = true;
    }

    onMenuMouseLeave() {
        this.menuMouseOn = false;
    }

    onMenuClick() {
        this.topOpen = !this.topOpen;
    }
}
