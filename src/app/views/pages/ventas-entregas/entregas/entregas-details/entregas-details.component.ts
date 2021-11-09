import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../../../models/sells.model';
import { EntregasPagService } from '../entregas-pag.service';
import { PagarModalComponent } from '../../../modals/pagar-modal/pagar-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-entregas-details',
  templateUrl: './entregas-details.component.html',
  styleUrls: ['./entregas-details.component.scss']
})
export class EntregasDetailsComponent implements OnInit {
  service_id:number;
  service:Service;
  cargando=false;
  observaciones:string = null;
  constructor(private route:ActivatedRoute, private entregasPagService:EntregasPagService, private modalService: NgbModal) {
    this.route.params.subscribe(data => {
      this.service_id = Number(data['id']);
     });
   }

  ngOnInit(): void {
    this.service = this.entregasPagService.ServiceId(this.service_id)
    if (this.service === undefined) {
      this.cargando = false;
    }else{
      this.cargando = true;
      this.service.details.forEach(detail=>{
        if( detail.observation){
          this.observaciones += ' ' + detail.observation + ','
        }
        
      })
    }

    if(this.observaciones != null){
      Swal.fire({
        icon: 'info',
        title: 'Observaciones',
        text:  `${this.observaciones}`
      });
    }
    
  }

  openModalPagar() {
    const modalRef = this.modalService.open(PagarModalComponent)
    let total = this.entregasPagService.totalAmount(this.service_id);
    modalRef.componentInstance.total = total;
    modalRef.componentInstance.serviceId = this.service_id;
    modalRef.componentInstance.tipo = 'entregas';
  }

}
