import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../../services/ventas.service';
import { User } from '../../../models/clients.model';
import { FuncionesService } from '../../../../services/funciones.service';
import { Service } from '../../../models/sells.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clients: User[] = [];
  clienteSeleccionado: User;
  serviciosPagados: Service[];
  serviciosAbonados: Service[];
  serviciosSinPagar: Service[];
  menuOp:string
  constructor(private ventasService:VentasService,private funcionesService:FuncionesService) { }

  ngOnInit(): void {
    this.getClients();
  }

  buscar(){
    if (this.clienteSeleccionado){
      this.funcionesService.clientRecords(this.clienteSeleccionado.id).subscribe((resp:any)=>{
        console.log(resp)
        this.serviciosPagados = resp.Pagados;
        this.serviciosAbonados = resp.Abonados;
        this.serviciosSinPagar = resp.sinPagar;
    })
    }
  }

  menu(opcion: string){
    if (this.menuOp === opcion){
    this.menuOp = '';
    }else{
    this.menuOp=opcion
    }
  }

 //Clientes
   getClients(){
     this.ventasService.getClients().subscribe((resp:User[])=>{
        this.clients = resp;        
     })
   }
}
