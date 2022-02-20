import { Injectable } from '@angular/core';
import { FuncionesService } from '../../../../services/funciones.service';
import { Service, Detail, Row } from '../../../models/sells.model';

@Injectable({
  providedIn: 'root'
})
export class StatusPagService {
  services:Service[]
  constructor() { }

  ServiceId(ide:number):Service{
    let serviceSel:Service 
    //recargar pagina en componente : error no se mando antes el servicio
    this.services.find(service =>{
      if (service.id === ide){
        serviceSel = service
      }   
    })
    return serviceSel
  }

  DetailId(ide:number):Detail{
    let detailSel:Detail 
    this.services.find(service =>{
      service.details.find(detail =>{
        if (detail.id === ide){
          detailSel = detail
        }
      })      
    })
    return detailSel
  }

  RowId(ide:number):Row{
    let rowSel:Row 
    this.services.find(service =>{
      service.details.find(detail =>{
        detail.rows.find(row =>{
          if (row.id === ide){
            rowSel = row
          }
        })        
      })      
    })
    return rowSel
  }

  serviceStatus(id:number,status:number){
    this.services.find(service=>{
      if(service.id === id){
        service.state=status;
      }
    })
  }

  detailStatus(id:number,status:number){
    this.services.find(service =>{
      service.details.find(detail =>{
        if (detail.id === id){
          detail.status = status;
        }
      })      
    })
  }

  rowStatus(id:number,status:number){
    this.services.find(service =>{
      service.details.find(detail =>{
        detail.rows.find(row =>{
          if (row.id === id){
            row.status = status
          }
        })        
      })      
    })
  }
  
  agregarObservacion(id :number, observacion:string){
    console.log('llega',id);
    this.services.find(service =>{
      service.details.find(detail =>{
        console.log('entra', detail.id);
        if (detail.id === id){
          detail.observation = observacion;
        }
      })      
    })
  }

  quitarObservacion(id:number){
    this.services.find(service =>{
      service.details.find(detail =>{
        if (detail.id === id){
          detail.observation = null;
        }
      })      
    })
  }

  // //second
  // statusZeroToOne(){
  //   this.services.find(service =>{
  //     if (service.state === 0){
  //       service.state = 1
  //     }
  //     service.details.find(detail =>{
  //       if(detail.status === 0){
  //         detail.status = 1
  //       }
  //       detail.rows.find(row =>{
  //         if (row.status === 0){
  //           row.status = 1
  //         }
  //       })        
  //     })      
  //   })
  // }

  // //first
  // statusZeroToThree(){
  //   this.services.find(service =>{
  //     service.details.find(detail =>{
  //       detail.rows.find(row =>{
  //         if (row.status === 3){
  //           this.services.find(service =>{
  //             service.details.find(detail =>{
  //               if (detail.id === row.detailId){
  //                 detail.status = 3;
  //                 this.services.find(service=>{
  //                   if(service.id === detail.serviceId){
  //                     service.state=3;
  //                   }
  //                 })
  //               }
  //             })      
  //           })
  //         }
  //       })        
  //     })      
  //   })
  // }

  //new - try it 
  statusZerotoOneOrThree(serviceId:number){
    const service:Service =  this.ServiceId(serviceId);
      service.details.forEach(d => {
        // cambiar los ceros a unos automaticamente
        d.rows.forEach(r => {
          if (r.status === 0) {
            r.status = 1;
          }
        })
        let sizeR = d.rows.length
        const RowArray = d.rows.filter(r => r.status == 1 )
        let sizeRA = RowArray.length
        if (sizeR === sizeRA) {
          //todas las row estan en estatus 1 = terminado
           d.status = 1;
        }else{
          // hay algun row pendiente
          d.status = 3;
        }        
      })
      let sizeD = service.details.length
      const DetailsArray = service.details.filter(d => d.status == 1)
      let sizeDA = DetailsArray.length
      if (sizeD == sizeDA){
        service.state = 1;
      }else{
        service.state = 3;
      }

  }

}
