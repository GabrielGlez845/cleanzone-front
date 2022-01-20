import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearGraphComponent } from './linear-graph/linear-graph.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { LinearGraphReduceComponent } from './linear-graph-reduce/linear-graph-reduce.component';

@NgModule({
  declarations: [ LinearGraphComponent, BarGraphComponent, LinearGraphReduceComponent],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports:[LinearGraphComponent,BarGraphComponent,LinearGraphReduceComponent]
})
export class GraphsModule { }
