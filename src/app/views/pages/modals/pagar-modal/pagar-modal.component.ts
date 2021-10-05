import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasPAGService } from '../../ventas-entregas/ventas/ventas-pag.service';
import { VentasService } from '../../../../services/ventas.service';
import { Payment, Row, Detail, Service } from '../../../models/sells.model';
import { EntregasPagService } from '../../ventas-entregas/entregas/entregas-pag.service';
import { FuncionesService } from '../../../../services/funciones.service';

@Component({
  selector: 'app-pagar-modal',
  templateUrl: './pagar-modal.component.html',
  styleUrls: ['./pagar-modal.component.scss']
})
export class PagarModalComponent implements OnInit {

  @Input() total;
  amount:number = 0;
  @Input() serviceId;
  @Input() tipo : string;
  bandera = false
  constructor(public activeModal: NgbActiveModal, private ventasPagService:VentasPAGService,private ventasService:VentasService
            , private entregasPagService:EntregasPagService, private funcionesService:FuncionesService) { }

  ngOnInit(): void {
    if(this.tipo === 'ventas'){
      this.bandera = true;
    }else{
      this.bandera = false;
    }
  }

  //change for transaction in back 
  pagar(){
    if(this.tipo === 'ventas'){
      this.ventasService.postService(this.ventasPagService.venta).subscribe((resp:any)=>{   
        let serviceId = resp.data.id
        this.ventasPagService.ventaDetalle.find(venta => {
            venta.serviceId = serviceId
        })
        this.ventasService.postDetail(this.ventasPagService.ventaDetalle).subscribe(resp =>{
          console.log(resp)      
          this.ventasService.postRows(this.ventasPagService.Fila).subscribe(resp=>{
            console.log(resp)
            const date = new Date();
            let pay:Payment={
              id:date.getTime(),
              amount:this.amount,
              createdAt: date,
              updatedAt:date,
              serviceId:serviceId
            }
            console.log(pay)
            this.ventasService.postPayments(pay).subscribe(resp=>{
              console.log('pay')
              console.log(resp)
            })
          })
        })
      })
    }else if (this.tipo === 'entregas'){
      if (this.amount >= this.total){
        this.entregasPagService.statusOneToTwo();
        let rows: Row[] = []
        let details : Detail[] = []    
        let service : Service;
        this.entregasPagService.services.find(service1 => {
          if(service1.id === this.serviceId){
            service = service1;
          }
        })
          this.funcionesService.statusChangeService(service).subscribe(resp=>{
            details = service.details 
            console.log(resp)      
            this.funcionesService.statusChangeDetail(details).subscribe(resp=>{
              console.log(resp)
              details.find(detail =>{ 
                detail.rows.find(row=>{
                  console.log('row',row)
                  rows.push(row)
                })  
              })
              this.funcionesService.statusChangeRow(rows).subscribe(resp =>{
                console.log(resp)
              })
            })
          })          
      }else{
        console.log('No es suficiente el saldo')
      }    
   }
  }
}
