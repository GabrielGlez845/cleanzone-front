import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionesComponent } from './funciones.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FuncionesComponent
  }
]

@NgModule({
  declarations: [FuncionesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FuncionesModule { }
