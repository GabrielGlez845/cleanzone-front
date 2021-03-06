import { Injectable } from '@angular/core';
import { Color } from '../../../models/color.model';
import { Service, Detail, Row } from '../../../models/sells.model';
import { VentasService } from '../../../../services/ventas.service';
import { Product } from '../../../models/products.model';

@Injectable({
  providedIn: 'root'
})

export class VentasPAGService {
  venta: Service
  ventaDetalle: Detail[] = [];
  Fila: Row[] = [];
  selected: number;
  repetido = false;
  amount = 0;
  ticket: string;
  lastVentaId:number;
  constructor(private ventasService:VentasService) {

    // this.venta = {
    //     id:1,
    //     state:0,
    //     userId:1,
    //     employeeId:1
    // }

    // this.ventaDetalle.push({
    //   id:1,
    //   identifier:1,
    //   ticket:'ticket',
    //   status:0,
    //   serviceId:1
    // })

    // this.Fila.push({
    //   id:1,
    //   quantity:1,
    //   observations:'not',
    //   colors:'',
    //   status:0,
    //   detailId:1,
    //   productId:2,
    //   product:{id:1,name:'PANTALON'}
    // })


    
   // this.ventasService.postService(this.venta).subscribe((resp:any) =>{
   //   console.log(resp)
      this.ventasService.getLastDate().subscribe((resp:any) =>{
        console.log(resp);
        console.log(resp.data[0])
        if (resp.data[0]){
          let date = resp.data[0].createdAt
          this.ventasService.getLastService(date).subscribe((resp:any) =>{
            console.log(resp);
            this.lastVentaId = resp.id            
        })
        }else{
          console.log('No existen servicios anteriores');
          //this.lastVentaId = 1;
        }
        
      })
   // })   
   }

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
    console.log('ticket',ticket)
    console.log('ide', ide)
    if (ticket === ''){
      return;
    }
    let i = 0;
    this.ventaDetalle.find(venta =>{
      if(venta.identifier === ide){
        this.ventaDetalle[i].ticket+=` ( ${ticket} ) `;
        this.selected = this.ventaDetalle[i].identifier;
      }      
      i++;
    })
    this.ticket = ''; 
  }

  agregarIdDetalle(row: Row) {
    console.log(row);
        this.Fila.push(row);
  }

  agregarObservacionDetalle(ide:number,observacion:string) {
     let j = 0;
     this.Fila.find(row =>{
          if(row.id === ide){
              this.Fila[j].observations+=` ${observacion} `;
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
      if(row.id === ide){
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

  totalAmount():number{
    let total=0;
    this.ventaDetalle.find(venta =>{
      this.Fila.find(row =>{
        if(venta.id === row.detailId){
          total = total + (row.product.pricings[0].price * row.quantity)
        }      
      }) 
    }) 
    return total
  }

 crearTabla():any[]{
   let tabla:{categoria:string,detalle:{detailId:number, products:{name:string,quantity:number,price:number}[]}[]}[] = [];
   this.Fila.forEach(r =>{
     const detailIDE = tabla.find(t => t.categoria == r.product.category.name);
     if (detailIDE){
       const detail = detailIDE.detalle.find(d => d.detailId == r.detailId)
       if (detail){
          detail.products.push({name:r.product.name,quantity:r.quantity,price:r.product.pricings[0].price})      
       }else{   
         detailIDE.detalle.push({detailId:r.detailId, products:[{name:r.product.name,quantity:r.quantity,price:r.product.pricings[0].price}]})
       }
     }else{
       tabla.push({categoria:r.product.category.name,detalle:[{detailId:r.detailId,products:[{name:r.product.name,quantity:r.quantity,price:r.product.pricings[0].price}]}]});
     }
   })

  return tabla
 }
  
  cambiarIdTicket(ide:number,newIde:number,ticket:string){
    for (var i = 0,len = this.ventaDetalle.length; i < len; i++) {
      if(this.ventaDetalle[i].id === ide){   
        this.ventaDetalle[i].id = newIde
        this.ventaDetalle[i].identifier = newIde
        this.ventaDetalle[i].ticket = ' (' + ticket + ') '
      }
   } 
  }
}

//finish sells part whit the oay and sendding the information for server
