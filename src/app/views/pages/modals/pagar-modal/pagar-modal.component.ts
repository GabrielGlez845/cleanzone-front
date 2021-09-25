import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasPAGService } from '../../ventas-entregas/ventas/ventas-pag.service';
import { VentasService } from '../../../../services/ventas.service';
import { Payment } from '../../../models/sells.model';

@Component({
  selector: 'app-pagar-modal',
  templateUrl: './pagar-modal.component.html',
  styleUrls: ['./pagar-modal.component.scss']
})
export class PagarModalComponent implements OnInit {

  @Input() amount;
  @Input() serviceId;
  constructor(public activeModal: NgbActiveModal, private ventasPagService:VentasPAGService,private ventasService:VentasService) { }

  ngOnInit(): void {
  }

  pagar(){
    this.ventasService.postService(this.ventasPagService.venta).subscribe(resp=>{
      console.log(resp);
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
            serviceId:this.serviceId
          }
          this.ventasService.postPayments(pay).subscribe(resp=>{
            console.log(resp)
          })
        })
      })
    })
  }

}
