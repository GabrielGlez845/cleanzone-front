import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/clients.model';
import { FuncionesService } from '../../../../services/funciones.service';
import { Service, Detail } from '../../../models/sells.model';
import { VentasService } from '../../../../services/ventas.service';
import { EntregasService } from '../../../../services/entregas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  folio:number;
  filtro:any;
  clients:User[];
  clienteSeleccionado:User;
  services:Service[];
  //serviceF:Service;
  cargando = true;
  page = 1;
  pageSize = 5;
  finish = undefined;
  start = undefined;
  type = undefined;
  details:Detail[];
  constructor(private funcionesService:FuncionesService, private ventasService:VentasService, private entregasService:EntregasService) { }

  ngOnInit(): void {
    this.getClients();
  }

  menu(opcion: string){
    if (this.filtro === opcion){
    this.filtro = '';
    }else{
    this.filtro=opcion
    }  
  }


  buscar(){
    if(this.folio){
      console.log('lleno');
      this.entregasService.ServiceById(this.folio).subscribe((resp:Service) =>{
        this.services[0] = resp;
      })
      return
    }
    if((this.start === undefined && this.finish === undefined) || (this.start != undefined && this.finish != undefined)  ){
     if ((this.start === '' && this.finish === '') || (this.start != '' && this.finish != '')){
      let clientId = undefined;
      if(this.clienteSeleccionado != undefined || null){
         clientId = this.clienteSeleccionado.id
      }
      this.funcionesService.notesSearch(clientId,this.finish,this.start).subscribe((resp:Service[])=>{
        console.log(resp);
        this.services = resp;
        this.cargando = false;
      })
    }else{
      console.log('error ambos llenos')
    }
  }else{
    console.log('error ambos llenos')
  }
  }

    //Clientes
    getClients(){
      this.ventasService.getClients().subscribe((resp:User[])=>{
          this.clients = resp;        
      })
    }

}
