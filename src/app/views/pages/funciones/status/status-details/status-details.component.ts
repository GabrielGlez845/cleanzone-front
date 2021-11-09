import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionesService } from '../../../../../services/funciones.service';
import { Detail, Row, Service } from '../../../../models/sells.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PendienteModalComponent } from '../../../modals/pendiente-modal/pendiente-modal.component';
import { StatusPagService } from '../status-pag.service';

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.scss']
})
export class StatusDetailsComponent implements OnInit {
service_id:number;
service:Service;
cargando = false;
  constructor(private route:ActivatedRoute, private modalService: NgbModal, public statusPagService:StatusPagService, private funcionesService:FuncionesService) {
    this.route.params.subscribe(data => {
      this.service_id = Number(data['id']);
    /*  if (data['tipo'] === 'plataforma') {
        this.regresartipo = data['tipo'];
        this.bandera=true;
     }else{
       this.bandera=false;
       this.regresartipo = data['tipo'];
     }*/
     });
   }

  ngOnInit(): void {
    /*this.funcionesService.StatusDetailsId(this.detail_id).subscribe((resp:Detail[])=>{
      console.log(resp)
      this.detail = resp[0];      
    })*/
    this.service = this.statusPagService.ServiceId(this.service_id)
    if (this.service === undefined) {
      this.cargando = false;
    }else{
      this.cargando = true;
    }
  }


  cambiarStatus(id:number,status:number){
    if(status === 3){
      //Opne modal pendiente
      const modalRef = this.modalService.open(PendienteModalComponent,{ size: 'lg' })
      modalRef.componentInstance.id = id;
    }else{
      this.statusPagService.rowStatus(id,1)
      this.statusPagService.quitarObservacion(id)
    }
  }
 
  finalizarStatus(){  
    this.statusPagService.statusZeroToOne();  
    this.statusPagService.statusZeroToThree();
    
    let rows: Row[] = []
    let details : Detail[] = []    
      this.funcionesService.statusChangeService(this.service).subscribe(resp=>{
        details = this.service.details 
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
  }
}
