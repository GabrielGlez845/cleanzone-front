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
    this.services.find(service =>{
      service.details.find(detail =>{
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

  //second
  statusZeroToOne(){
    this.services.find(service =>{
      if (service.state === 0){
        service.state = 1
      }
      service.details.find(detail =>{
        if(detail.status === 0){
          detail.status = 1
        }
        detail.rows.find(row =>{
          if (row.status === 0){
            row.status = 1
          }
        })        
      })      
    })
  }

  //first
  statusZeroToThree(){
    this.services.find(service =>{
      service.details.find(detail =>{
        detail.rows.find(row =>{
          if (row.status === 3){
            this.services.find(service =>{
              service.details.find(detail =>{
                if (detail.id === row.detailId){
                  detail.status = 3;
                  this.services.find(service=>{
                    if(service.id === detail.serviceId){
                      service.state=3;
                    }
                  })
                }
              })      
            })
          }
        })        
      })      
    })
  }

}
