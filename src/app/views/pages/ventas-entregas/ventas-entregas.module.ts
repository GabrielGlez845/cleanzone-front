import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
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
]

@NgModule({
  declarations: [VentasEntregasComponent, VentasComponent, EntregasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TagInputModule,
    FormsModule,
    NgSelectModule,
    ArchwizardModule,
    PerfectScrollbarModule,
    FeahterIconModule
   
  ]
})
export class VentasEntregasModule { }
