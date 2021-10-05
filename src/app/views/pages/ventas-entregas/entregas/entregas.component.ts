import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2' 
import { VentasService } from '../../../../services/ventas.service';
import { User } from 'src/app/views/models/clients.model';
import { EntregasService } from 'src/app/services/entregas.service';
import { Service, Detail } from '../../../models/sells.model';
import { EntregasPagService } from './entregas-pag.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.scss']
})
export class EntregasComponent implements OnInit {

  clients: User[];
  menuEntregas:string;
  clienteSeleccionado: User = null;
  folio:number = 0;
  menu:string;
  //services:Service[];
  details:Detail[];
  cargando=false;
constructor( private ventasService:VentasService, private entregasService:EntregasService, public entregasPagService:EntregasPagService) {
  
}

ngOnInit(): void {
  this.getClients();
}

  menuEntregasF(opcion: string){
    if (this.menuEntregas === opcion){
    this.menuEntregas = '';
    }else{
    this.menuEntregas=opcion
    }
  
  }
  
  menuF(opcion: string){
    if (this.menu === opcion){
    this.menu = '';
    }else{
    this.menu=opcion
    }
    console.log('cliente', this.clienteSeleccionado)
  
  }

  entregasDia(){
    let date = new Date()
    if (this.clienteSeleccionado){
      this.entregasService.DeliveriesAtTimeUser(date,this.clienteSeleccionado.id).subscribe((resp:Service[])=>{
        console.log('del dia user', resp)
        this.entregasPagService.services = resp
      })
    }else{
    this.entregasService.DeliveriesAtTime(date).subscribe((resp:Service[])=>{
      console.log('del dia',resp)
      this.entregasPagService.services = resp
     })
    }
  }

  entregasPendientesTerminadas(){
    let date = new Date()
    if (this.clienteSeleccionado){
      this.entregasService.DeliveriesfinishedEarringsUser(date,this.clienteSeleccionado.id).subscribe((resp:Service[])=>{
        console.log('penditermin user', resp)
        this.entregasPagService.services = resp
      })
    }else{
    this.entregasService.DeliveriesfinishedEarrings(date).subscribe((resp:Service[])=>{
      console.log('penditermin', resp)
      this.entregasPagService.services = resp
      })
    }
   }

  entregasPendientes(){
    let date = new Date()
    if (this.clienteSeleccionado){
      this.entregasService.DeliveriesEarringsUser(date,this.clienteSeleccionado.id).subscribe((resp:Service[])=>{
        console.log('pendientes user', resp)
        this.entregasPagService.services = resp
      })
    }else{
    this.entregasService.DeliveriesEarrings(date).subscribe((resp:Service[]) =>{
      console.log('pendientes',resp)
      this.entregasPagService.services = resp
      })
    }
  }

  notasPorPagar(){
    let date = new Date()
    if (this.clienteSeleccionado){
      this.entregasService.DeliveriesPendignPaymentUser(date,this.clienteSeleccionado.id).subscribe((resp:Service[])=>{
        console.log('pendientes por pagar user', resp)
        this.entregasPagService.services = resp
      })
    }else{
    this.entregasService.DeliveriesPendignPayment(date).subscribe((resp:Service[]) =>{
      console.log('pendientes por pagar',resp)
      this.entregasPagService.services = resp
      })
    }
  }

  buscarNota(id:number){
    this.entregasService.DeliveriesId(id).subscribe((resp:Detail[])=>{
      console.log(resp)
      this.details = resp
      this.cargando=true;
    })
  }
  
  buscarNotaDia(){
    if (false) {
    Swal.fire({
    icon: 'info',
    title: 'Observaciones',
    text: ' SE QUEDA PENDIENTE PANTALON DE ID 5670 (128) POR PROCESO '
    });
    }    
  }

    //Clientes
    getClients(){
      this.ventasService.getClients().subscribe((resp:User[])=>{
          this.clients = resp;        
      })
    }

   
}
