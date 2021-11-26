import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasPAGService } from '../../ventas-entregas/ventas/ventas-pag.service';
import { VentasService } from '../../../../services/ventas.service';
import { Payment, Row, Detail, Service } from '../../../models/sells.model';
import { EntregasPagService } from '../../ventas-entregas/entregas/entregas-pag.service';
import { FuncionesService } from '../../../../services/funciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  formaPago = [{id:1,name:'Pago'},{id:2,name:'Abono'},{id:3,name:'Credito'}];
  formaPagoSeleccionada = null;
  formaNovalida = false;
  amountNovalida = false;
  constructor(public activeModal: NgbActiveModal, private ventasPagService:VentasPAGService,private ventasService:VentasService
            , private entregasPagService:EntregasPagService, private funcionesService:FuncionesService,
              private route:Router) { }

  ngOnInit(): void {
    this.formaNovalida = false;
    this.amountNovalida = false;
  }

  //change for transaction in back 
  pagar(){
    if (this.validaciones()){
    if(this.tipo === 'ventas'){
      const date = new Date();
      let pay:Payment={
        id:date.getTime(), //not necesary
        amount:this.amount,
        serviceId:10, //not necesary
      }
      this.ventasService.postSell(this.ventasPagService.venta,this.ventasPagService.ventaDetalle,this.ventasPagService.Fila,pay).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.ok){
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'servicio creado con exito', icon: 'success'}
           );
           this.activeModal.close('modal cerrado'); //enviar a otro lado o borrar los valores
        }
      },err =>{
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'Error al pagar', icon: 'error'}
         );
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
                console.log(resp);
              })
            })
          })          
      }else{
        console.log('No es suficiente el saldo')
      }    
   }
  }else{
    console.log('No valido')
  }
  }

  validaciones():boolean {
    if (this.formaPagoSeleccionada === null || undefined){
      this.formaNovalida = true;
      return false;
    }else{
      this.formaNovalida = false;
    }
    if (this.formaPagoSeleccionada != 3 && this.amount  <= 0){
      this.amountNovalida = true;
      return false;
    }else{
      this.amountNovalida = false;
    }
    if (this.formaPagoSeleccionada === 1 && this.amount  < this.total){
      this.amountNovalida = true;
      return false;
    }else{
      this.amountNovalida = false;
    }
    return true
  }
}
