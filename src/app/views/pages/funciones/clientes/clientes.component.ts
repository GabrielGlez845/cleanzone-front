import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../../services/ventas.service';
import { User } from '../../../models/clients.model';
import { FuncionesService } from '../../../../services/funciones.service';
import { Service, Payment } from '../../../models/sells.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clients: User[] = [];
  clienteSeleccionado: User;
  serviciosPagados: Service[] = [];
  serviciosAbonados: Service[] = [];
  serviciosSinPagar: Service[] = [];
  menuOp:string
  constructor(private ventasService:VentasService,private funcionesService:FuncionesService) { }

  ngOnInit(): void {
    this.getClients();
  }

  buscar(){
    if (this.clienteSeleccionado){
      this.funcionesService.clientRecords(this.clienteSeleccionado.id).subscribe((resp:any)=>{
        console.log(resp)
        resp.servicioByUser.forEach(r => {
          console.log(r)
          const cliente = r.payments.find(p=> p.transaction.accountId == 1);
          if (r.payments.length >= 2 ){
            this.serviciosAbonados.push(r);
         }
         else if (cliente){
           this.serviciosSinPagar.push(r);
         }else{
           this.serviciosPagados.push(r);
         }
        });
        
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
