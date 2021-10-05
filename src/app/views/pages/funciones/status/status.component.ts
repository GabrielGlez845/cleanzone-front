import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../../../services/funciones.service';
import { Service } from '../../../models/sells.model';
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
    if (this.menuOp === opcion){
    this.menuOp = '';
    }else{
    this.menuOp=opcion
    }
  }

  estatusDia(){
    let date = new Date();    
    this.funcionesService.statusAtTime(date).subscribe((resp:Service[])=>{
      console.log('dia',resp)
      this.statusPagService.services = resp
    })
  }

  estatusPendientesTerminados(){
    let date = new Date();
    this.funcionesService.StatusfinishedEarrings(date).subscribe((resp:Service[])=>{
      console.log('penTerminados', resp)
      this.statusPagService.services = resp
    })
  }

  estatusPendientes(){
    let date = new Date();
    this.funcionesService.StatusEarrings(date).subscribe((resp:Service[])=>{
      console.log('Pendientes', resp)
      this.statusPagService.services = resp
    })
  }

 
}
