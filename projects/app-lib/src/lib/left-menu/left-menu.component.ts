import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'lib-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.less']
})
export class LeftMenuComponent implements OnInit {


    @Input('menuOpen')
    menuOpen;

    @Input('activeIndex')
    activeIndex = 0;

    constructor(public lang: LanguageService) {


    }

    ngOnInit(): void {
    }
    public openMenu() {
        this.menuOpen = !this.menuOpen;
    }

    toggleLang() {
        this.lang.changeLanguage(this.lang.curLanguage === 'zh' ? 'en' : 'zh');
    }
}
