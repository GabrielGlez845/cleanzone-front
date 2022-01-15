import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexMarkers, ApexTitleSubtitle, ApexFill, ApexYAxis, ApexXAxis, ApexTooltip, ApexPlotOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  @Input() data = [];
  @Input() categories = [];
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
  public plotOptions: ApexPlotOptions;
  constructor() { }

  ngOnInit(): void {
    this.initChartData();
  }

  public initChartData(): void {
    this.series = [];
    this.chart = {
      type: "bar",
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
    this.plotOptions = {
      bar: {
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    },
    this.series =  [{
      name: this.titulo,
      data: this.data
    } ]
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
       categories:this.categories
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
