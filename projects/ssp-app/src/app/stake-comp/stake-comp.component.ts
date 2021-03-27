import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-stake-comp',
    templateUrl: './stake-comp.component.html',
    styleUrls: ['./stake-comp.component.less']
})
export class StakeCompComponent implements OnInit {

    @Input('hidden')
    hidden = true;

    constructor() { }

    ngOnInit(): void {
    }

}
