import { Component ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VentasPAGService } from '../../ventas-entregas/ventas/ventas-pag.service';
import { Color } from '../../../models/color.model';

@Component({
  selector: 'app-agregar-color-modal',
  templateUrl: './agregar-color-modal.component.html',
  styleUrls: ['./agregar-color-modal.component.scss']
})
export class AgregarColorModalComponent {

  @Input() id;
  colores: Color[] = [];
  observacion=''
  //Colores Predefinidos
  colors=[{id:1,nombre:'Amarillo',cantidad:1,class:'#FFE900',color:'#000000'},{id:2,nombre:'Azul',cantidad:1,class:'#0000FF',color:'#FFFFFF'},
          {id:3,nombre:'Blanco',cantidad:1,class:'#FFFFFF',color:'#000000'},  {id:4,nombre:'Cafe',cantidad:1 ,class:'#591F0B',color:'#FFFFFF'},
          {id:5,nombre:'Gris',cantidad:1 ,class:'#989898',color:'#000000'},{id:6,nombre:'Naranja',cantidad:1 ,class:'#EF7F1A',color:'#FFFFFF'},
          {id:7,nombre:'Negro',cantidad:1 ,class:'#2B2A29',color:'#FFFFFF'},{id:8,nombre:'Purpura',cantidad:1 ,class:'#7D2181',color:'#FFFFFF'},
          {id:9,nombre:'Rojo',cantidad:1 ,class:'#E60026',color:'#FFFFFF'}, {id:10,nombre:'Rosa',cantidad:1 ,class:'#FD6C9E',color:'#FFFFFF'},
          {id:11,nombre:'Verde',cantidad:1 ,class:'##1ED760',color:'#FFFFFF'},]
  constructor(public activeModal: NgbActiveModal,public ventasServicePAG: VentasPAGService) {
   }

   nuevoColor(colorNew:Color){     
    let bandera = true 
    this.colores.find(color=>{
      if(color.id === colorNew.id){        
       color.cantidad += 1
       bandera = false
      } 
  })    
      if(bandera){
        this.colores.push(colorNew)
      }
  }

  cambiarCantidadColor(cantidad:number,colorNew:Color) {
    let h = 0 ;
    this.colores.find(color=>{
        if(color.id === colorNew.id){        
            if ( color.cantidad === 1 && cantidad < 0) {
              return
            }
          color.cantidad += cantidad
        }
      h++;
    })
  }

  eliminarColor(id:number){
    for (var i = 0,len = this.colores.length; i < len; i++) {
      if(this.colores[i].id === id){   
        this.colores.splice(i, 1)
        len = this.colores.length
      }
   }            
}
}
