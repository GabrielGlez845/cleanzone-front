import { Component, OnInit, Input } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexMarkers, ApexTitleSubtitle, ApexFill, ApexYAxis, ApexXAxis, ApexTooltip } from 'ng-apexcharts';

@Component({
  selector: 'app-linear-graph',
  templateUrl: './linear-graph.component.html',
  styleUrls: ['./linear-graph.component.scss']
})
export class LinearGraphComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
    this.initChartData();
  }

  public initChartData(): void {
    this.series = [];
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.series = this.data;
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: this.titulo,
      align: "left"
    };
    this.yaxis = {
      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      },
      title: {
        text: this.titulo_y
      },
      min: 0,
      max: this.max,
    };
    this.xaxis = {
      type: "datetime"
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      }
    };
  }

}
