import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageService} from '../services/language.service';

@Component({
    selector: 'lib-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.less']
})
export class LeftMenuComponent implements OnInit {


    @Output('menuOpen') menuOpen = new EventEmitter<any>();

    @Input('activeIndex')
    activeIndex = 0;

    IsMenuOpen = true;

    constructor(public lang: LanguageService) {


    }

    ngOnInit(): void {
    }

    openMenu(tag) {
        this.menuOpen.emit(tag);
        this.IsMenuOpen = !this.IsMenuOpen;
    }

    toggleLang() {
        this.lang.changeLanguage(this.lang.curLanguage === 'zh' ? 'en' : 'zh');
    }
}
