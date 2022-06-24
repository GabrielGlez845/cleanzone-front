import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionesComponent } from './funciones.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
//forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

// scroll
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//chips
import { NgSelectModule } from '@ng-select/ng-select';
//Icons
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
//Pagination
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Graficas
import { NgApexchartsModule } from "ng-apexcharts";
// Ng2-charts
import { ChartsModule } from 'ng2-charts';
//components
import { StatusComponent } from './status/status.component';
import { StatusDetailsComponent } from './status/status-details/status-details.component';
import { NotasComponent } from './notas/notas.component';
import { NotasDetailsComponent } from './notas/notas-details/notas-details.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { GastosComponent } from './gastos/gastos.component';
import { GraficasComponent } from './graficas/graficas.component';
import { FinanzasComponent } from './finanzas/finanzas.component';
import { CorteComponent } from './corte/corte.component';
import { GraphsModule } from '../graphs/graphs.module';
import { RoutesGuard } from '../../../core/guard/routes.guard';
import { PreciosPrendaComponent } from './precios-prenda/precios-prenda.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionesComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'status',
        component: StatusComponent,
        canActivate: [RoutesGuard],data: {id: [2]}
      },
      {
        path: 'status-detail/:id',
        component: StatusDetailsComponent,
        canActivate: [RoutesGuard],data: {id: [2]}
      },  
      {
        path: 'notas',
        component: NotasComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },  
      {
        path: 'notas-detail/:id',
        component: NotasDetailsComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },  
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },    
      {
        path: 'configuraciones',
        component: ConfiguracionComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },    
      {
        path: 'gastos',
        component: GastosComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },    
      {
        path: 'graficas',
        component: GraficasComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },    
      {
        path: 'finanzas',
        component: FinanzasComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },    
      {
        path: 'corte',
        component: CorteComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      },
      {
        path: 'precios-prenda/:id',
        component: PreciosPrendaComponent,
        canActivate: [RoutesGuard],data: {id: [1]}
      }     
  
    ]
  }
]


@NgModule({
  declarations: [FuncionesComponent, StatusComponent, StatusDetailsComponent, NotasComponent, NotasDetailsComponent, ClientesComponent, ConfiguracionComponent, GastosComponent, GraficasComponent, FinanzasComponent,CorteComponent, PreciosPrendaComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FeahterIconModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgApexchartsModule,
    ChartsModule,
    RouterModule.forChild(routes),
    GraphsModule
  ]
})
export class FuncionesModule { }
