import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

    @Input("itemText")
    itemText;

    mouseOn = false;

    @Input("targetUrl")
    url = "#";

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
    }

    onMouseEnter() {
        this.mouseOn = true;
    }

    onMouseLeave() {
        this.mouseOn = false;
    }

    safeUrl() {
        return this.sanitizer.sanitize(SecurityContext.URL, this.url);
    }

}
