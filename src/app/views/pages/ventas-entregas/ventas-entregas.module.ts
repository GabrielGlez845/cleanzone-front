import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
// Ngx-chips
import { TagInputModule } from 'ngx-chips';
//forms
import { FormsModule } from '@angular/forms';
//chips
import { NgSelectModule } from '@ng-select/ng-select';
// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';
// scroll
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//Icons
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { VentasEntregasComponent } from './ventas-entregas.component';
import { VentasComponent } from './ventas/ventas.component';
import { EntregasComponent } from './entregas/entregas.component';
import { EntregasDetailsComponent } from './entregas/entregas-details/entregas-details.component';


const routes: Routes = [
  {
    path: '',
    component: VentasEntregasComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  },
  {
    path: 'entregas',
    component: EntregasComponent
  },
  {
    path: 'entregas-detail/:id',
    component: EntregasDetailsComponent
  },
]

@NgModule({
  declarations: [VentasEntregasComponent, VentasComponent, EntregasComponent, EntregasDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TagInputModule,
    FormsModule,
    NgSelectModule,
    ArchwizardModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FeahterIconModule
   
  ]
})
export class VentasEntregasModule { }
