import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearGraphComponent } from './linear-graph/linear-graph.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { BarGraphComponent } from './bar-graph/bar-graph.component';

@NgModule({
  declarations: [ LinearGraphComponent, BarGraphComponent],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports:[LinearGraphComponent,BarGraphComponent]
})
export class GraphsModule { }
