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
//barras
import { NgxBarcodeModule } from 'ngx-barcode';
import { VentasEntregasComponent } from './ventas-entregas.component';
import { VentasComponent } from './ventas/ventas.component';
import { EntregasComponent } from './entregas/entregas.component';
import { EntregasDetailsComponent } from './entregas/entregas-details/entregas-details.component';
import { RoutesGuard } from '../../../core/guard/routes.guard';
import { BuscarPrendaPipe } from 'src/app/pipes/buscar-prenda.pipe';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'inicio',
    component: VentasEntregasComponent
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [RoutesGuard],data: {id: 3}
  },
  {
    path: 'entregas',
    component: EntregasComponent,
    canActivate: [RoutesGuard],data: {id: 4}
  },
  {
    path: 'entregas-detail/:id',
    component: EntregasDetailsComponent,
    canActivate: [RoutesGuard],data: {id: 4}
  },
]

@NgModule({
  declarations: [VentasEntregasComponent, VentasComponent, EntregasComponent, EntregasDetailsComponent, BuscarPrendaPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TagInputModule,
    FormsModule,
    NgSelectModule,
    ArchwizardModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FeahterIconModule,
    NgxBarcodeModule,
    FormsModule,
    ReactiveFormsModule
   
  ]
})
export class VentasEntregasModule { }
