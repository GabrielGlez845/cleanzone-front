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
  observaciones: any[] = [{ id: 1, nombre: 'sucio', alias: 'sc', seleccionado: false }, { id: 2, nombre: 'roto', seleccionado: false, alias: 'rt' }, { id: 3, nombre: 'decolorado', seleccionado: false, alias: 'dl' }, { id: 4, nombre: 'descocido', seleccionado: false, alias: 'dc' }]
  constructor(public activeModal: NgbActiveModal,public ventasServicePAG: VentasPAGService) {
   }

   agregarObservacionModal(){
    this.observaciones.forEach(observa => {
      if (observa.seleccionado) {
        this.observacion += ' ' + observa.alias + ','
      }
    })
    this.ventasServicePAG.agregarObservacionDetalle(this.id,this.observacion)
   }
}
