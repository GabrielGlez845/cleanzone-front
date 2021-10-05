import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionesComponent } from './funciones.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
// scroll
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//Icons
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { StatusComponent } from './status/status.component';
import { StatusDetailsComponent } from './status/status-details/status-details.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionesComponent
  },
  {
    path: 'status',
    component: StatusComponent
  },
  {
    path: 'status-detail/:id',
    component: StatusDetailsComponent
  }
]

@NgModule({
  declarations: [FuncionesComponent, StatusComponent, StatusDetailsComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FeahterIconModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class FuncionesModule { }
