import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import BigNumber from 'bignumber.js';
import { createChart } from 'lightweight-charts';
import { BootService } from '../services/boot.service';

@Component({
    selector: 'app-tv-volume',
    templateUrl: './tv-volume.component.html',
    styleUrls: ['./tv-volume.component.less']
})
export class TvVolumeComponent implements OnInit {

    @ViewChild('tv_chart')
    tvChart: ElementRef;

    constructor(public boot: BootService) {
        this.boot.walletReady.subscribe(() => {
            setTimeout(() => {
                const chart = createChart(this.tvChart.nativeElement);
                const lineSeries = chart.addLineSeries();
                this.boot.getSubgraph().then(data => {
                    lineSeries.setData(data.liquidity);
                });

            }, 0);
        })
    }

    ngOnInit(): void {

    }

}
