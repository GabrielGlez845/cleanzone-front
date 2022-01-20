import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexMarkers, ApexTitleSubtitle, ApexFill, ApexYAxis, ApexXAxis, ApexTooltip, ApexStroke } from 'ng-apexcharts';

@Component({
  selector: 'app-linear-graph-reduce',
  templateUrl: './linear-graph-reduce.component.html',
  styleUrls: ['./linear-graph-reduce.component.scss']
})
export class LinearGraphReduceComponent implements OnInit {
  @Input() data = [];
  @Input() titulo = "";
  @Input() titulo_y = "";
  @Input() max = 50;
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;
  public stroke:ApexStroke;
  constructor() { }

  ngOnInit(): void {
    this.initChartData();
  }

  public initChartData(): void {
    this.series = [];
    this.chart = {
      type: "area",
      stacked: false,
      height: 60,
      sparkline: {
        enabled: !0
      },
      toolbar: {
        show: false,
        offsetX: 0,
        offsetY: 0
      }
    };
    this.series = this.data;
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.yaxis = {
      show:false,
      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      }
    };
    this.tooltip = {
      shared: false,
    };
  }

}
