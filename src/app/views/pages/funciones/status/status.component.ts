import { Component, OnInit } from '@angular/core';
import { parseISO } from 'date-fns';
import { FuncionesService } from '../../../../services/funciones.service';
import { Service, Payment } from '../../../models/sells.model';
import { StatusPagService } from './status-pag.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  menuOp:string
  activo = false;
  constructor(public statusPagService:StatusPagService,private funcionesService:FuncionesService) { }

  ngOnInit(): void {
  }

  menu(opcion: string){
    this.menuOp=opcion
  }

  estatusDia(){
    let date = new Date().toJSON(); 
    this.funcionesService.statusAtTime(date).subscribe((resp:Service[])=>{
      console.log('dia',resp)
      this.statusPagService.services = resp
    })
  }

  estatusPendientesTerminados(){
    let date = new Date().toJSON(); 
    this.funcionesService.StatusfinishedEarrings(date).subscribe((resp:Service[])=>{
      console.log('penTerminados', resp)
      this.statusPagService.services = resp
    })
  }

  estatusPendientes(){
    let date = new Date().toJSON(); 
    this.funcionesService.StatusEarrings(date).subscribe((resp:Service[])=>{
      console.log('Pendientes', resp)
      this.statusPagService.services = resp
    })
  }

  tipoPago(payment:Payment[]):string{
      if (payment.length >= 2 ){
          return 'ABONO'
      }
      const cliente = payment.find(p=> p.transaction.accountId == 1);
      if (cliente){
        return 'CREDITO'
      }else{
        return 'PAGADO'
      }
  }
 
}
