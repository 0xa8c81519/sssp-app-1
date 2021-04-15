import {DatePipe} from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import BigNumber from 'bignumber.js';
import {createChart} from 'lightweight-charts';
import {BootService} from '../services/boot.service';

@Component({
    selector: 'app-tv-volume',
    templateUrl: './tv-volume.component.html',
    styleUrls: ['./tv-volume.component.less']
})
export class TvVolumeComponent implements OnInit {

    @ViewChild('tv_chart')
    tvChart: ElementRef;
    @ViewChild('tooltip')
    tooltip: ElementRef;
    list: [] = [];

    constructor(public boot: BootService) {
        this.boot.walletReady.subscribe(() => {
            setTimeout(() => {
                const chart = createChart(this.tvChart.nativeElement, {
                    layout: {
                        textColor: '#d1d4dc',
                        backgroundColor: '#161921',
                    },
                    leftPriceScale: {
                        visible: false,
                    },
                    rightPriceScale: {
                        visible: false,
                    },
                    crosshair: {
                        vertLine: {
                            labelVisible: false,
                        }
                    },
                    grid: {
                        vertLines: {
                            visible: false,
                        },
                        horzLines: {
                            visible: false,
                        },
                    },
                });
                const lineSeries = chart.addAreaSeries(
                    {
                        topColor: 'rgba(0, 150, 136, 0.56)',
                        bottomColor: 'rgba(0, 150, 136, 0.04)',
                        lineColor: 'rgba(0, 150, 136, 1)',
                        lineWidth: 2,
                    }
                );
                this.boot.getSubgraph().then(data => {
                    lineSeries.setData(data.liquidity);
                    this.list = data.liquidity;
                });
                const toolTipWidth = 100;
                const toolTipHeight = 80;
                const toolTipMargin = 15;
                const toolTip = this.tooltip.nativeElement;
                const width = 600;
                const height = 300;

                chart.subscribeCrosshairMove((param) => {
                    if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
                        toolTip.style.display = 'none';
                        return;
                    }
                    const value = param.seriesPrices.get(lineSeries);
                    toolTip.style.display = 'block';
                    toolTip.innerHTML = '<div style="font-size: 13px; margin: 4px 0px">' + value + '</div>';
                    const y = param.point.y;

                    let left = param.point.x + toolTipMargin;
                    if (left > width - toolTipWidth) {
                        left = param.point.x - toolTipMargin - toolTipWidth;
                    }

                    let top = y + toolTipMargin;
                    if (top > height - toolTipHeight) {
                        top = y - toolTipHeight - toolTipMargin;
                    }

                    toolTip.style.left = (left + 20) + 'px';
                    toolTip.style.top = top + 'px';
                });

            }, 0);
        });
    }

    ngOnInit(): void {

    }

}
