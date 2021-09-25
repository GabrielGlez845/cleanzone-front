import { Injectable } from '@angular/core';
import { Color } from '../../../models/color.model';
import { Service, Detail, Row } from '../../../models/sells.model';

@Injectable({
  providedIn: 'root'
})

export class VentasPAGService {
  venta: Service
  ventaDetalle: Detail[] = [];
  Fila: Row[] = [];
 // identifiers: number[] = [];
  selected: number;
  repetido = false;
  amount = 0;
  constructor() { }

  agregarId(ventaDetail: Detail) {
    this.ventaDetalle.find(venta => {
      if (venta.identifier === ventaDetail.identifier) {
        return this.repetido = true;
      } else {
        this.repetido = false;
      }
    });
    
   
    if (this.repetido) {
      return;
    }

    if (this.ventaDetalle.length === 0) {
      this.selected = ventaDetail.identifier;
    }
    this.ventaDetalle.push(ventaDetail);
   // this.ventaDetalle.push(sellDetail);
  }

  agregarTicket(ticket:string,ide:number){
    let i = 0;
    this.ventaDetalle.find(venta =>{
      if(venta.identifier === ide){
        this.ventaDetalle[i].ticket+=` ( ${ticket} ) `;
        this.selected = this.ventaDetalle[i].identifier;
      }      
      i++;
    }) 
  }

  agregarIdDetalle(row: Row) {
    console.log(row);
        this.Fila.push(row);
  }

  agregarObservacionDetalle(ide:number,observacion:string) {
     let j = 0;
     this.Fila.find(row =>{
          if(row.detailId === ide){
              this.Fila[j].observations+=` ${observacion} ,`;
           }      
         j++;
      }) 
  }

  agregarColorDetalle(ide:number,colores:Color[]) {
    let i = 0;
    let color = '';
   colores.forEach(colorIn =>{
     color += `${colorIn.cantidad} .- ${colorIn.nombre}, `
   })
    this.Fila.find(row =>{
      if(row.detailId === ide){
        this.Fila[i].colors+=` ${color} `;
      }      
      i++;
    }) 
  }
  clear() {
    this.ventaDetalle = [];
  }

  deleteRowId(ide: number) { 
      for (var i = 0,len = this.Fila.length; i < len; i++) {
        if(this.Fila[i].id === ide){   
          this.Fila.splice(i, 1)
          len = this.Fila.length
        }
     } 
  }
  
  deleteDetailId(ide:number){
    for (var i = 0,len = this.ventaDetalle.length; i < len; i++) {
      if(this.ventaDetalle[i].id === ide){   
        this.ventaDetalle.splice(i, 1)
        len = this.ventaDetalle.length
      }
   } 
  }

 
  changeIdSelected(id: number) {
    this.selected = id;
    console.log(this.selected)
  }

  totalAmount(){
    let total=0;
    this.ventaDetalle.find(venta =>{
      this.Fila.find(row =>{
        if(venta.id === row.detailId){
          total = row.product.pricings[0].price * row.quantity
        }      
      }) 
    }) 
    return total
  }

 
  
}

//finish sells part whit the oay and sendding the information for server
