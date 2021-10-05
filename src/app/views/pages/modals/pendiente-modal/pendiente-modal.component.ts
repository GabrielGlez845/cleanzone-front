import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusPagService } from '../../funciones/status/status-pag.service';
import { Row } from '../../../models/sells.model';

@Component({
  selector: 'app-pendiente-modal',
  templateUrl: './pendiente-modal.component.html',
  styleUrls: ['./pendiente-modal.component.scss']
})
export class PendienteModalComponent implements OnInit {

  @Input() id :number;
  row:Row
  cargando=false;
  observacion:string;
  constructor(public activeModal: NgbActiveModal,private statusPagService:StatusPagService) { }

  ngOnInit(): void {
   this.row = this.statusPagService.RowId(this.id)
   if(this.row === undefined){
     this.cargando = false
   }else{
     this.cargando = true
     console.log(this.row)
   }
  }

  dejarPendiente(){
    this.statusPagService.rowStatus(this.id,3);
    this.statusPagService.agregarObservacion(this.id,this.observacion)
  }

}
