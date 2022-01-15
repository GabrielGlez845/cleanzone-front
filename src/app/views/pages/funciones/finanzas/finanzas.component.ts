import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../../services/funciones.service';
import { resp } from '../../../models/login.model';


@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {
  expenses = 0;
  availableMoney = 0;
  noAvailableMoney = 0;
  cargando = true;
  constructor(private funcionesService:FuncionesService) {

  }

  ngOnInit(): void {
    this.funcionesService.getTransactionBalance().subscribe((resp:resp)=>{
      this.expenses = resp.data.gasto;
      this.availableMoney = resp.data.dineroDiponible;
      this.noAvailableMoney = resp.data.dineroNoDisponible;
      this.cargando = false;
    })
  }
}
