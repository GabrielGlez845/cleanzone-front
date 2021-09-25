import { Component,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasPAGService } from '../../ventas-entregas/ventas/ventas-pag.service';

@Component({
  selector: 'app-agregar-observacion-modal',
  templateUrl: './agregar-observacion-modal.component.html',
  styleUrls: ['./agregar-observacion-modal.component.scss']
})
export class AgregarObservacionModalComponent {

  @Input() id;
  observacion:string = '';
  constructor(public activeModal: NgbActiveModal,public ventasServicePAG: VentasPAGService) {
   }

}
