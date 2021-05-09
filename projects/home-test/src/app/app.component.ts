import {Component, OnInit} from '@angular/core';
import {LanguageService} from 'app-lib';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isAndroid;
    menuMouseOn = false;
    topOpen = false;
    menu = environment.menu;

    itemListBoxOne: any[] = [
        {imgUrl: '1', name: 'Payment Mining', tip: 'Pay in your choice of currency. Get paid to pay with  Payment Mining'},
        {imgUrl: '2', name: 'Stablecoin swaps', tip: 'Low fees / Minimum slippage / Low risk'},
        {imgUrl: '3', name: 'Liquidity mining', tip: 'Earn BST+Earn great APY on stablecoins.'}
    ];

    Audited: any[] = [
        {imgUrl: 'zhidao'},
        {imgUrl: 'anchain'}
    ];

   Strategic: any[] = [
        {imgUrl: 'zhidao'},
        {imgUrl: 'anchain'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'anchain'},
        {imgUrl: 'zhidao'}
    ];

    Partners: any[] = [
        {imgUrl: 'zhidao'},
        {imgUrl: 'anchain'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'anchain'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'anchain'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'zhidao'},
        {imgUrl: 'anchain'},
        {imgUrl: 'zhidao'}
    ];


    constructor(public lang: LanguageService) {

    }

    ngOnInit(): void {
        const isMobile = (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i));
        const u = navigator.userAgent;
        this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
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
