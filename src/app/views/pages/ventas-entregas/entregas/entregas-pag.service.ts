import { Injectable } from '@angular/core';
import { Service } from '../../../models/sells.model';

@Injectable({
  providedIn: 'root'
})

export class EntregasPagService {
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

  totalAmount(id:number){
    let total=0;
    this.services.find(service =>{
      if(service.id === id){
        service.details.find(detail=>{
          detail.rows.find(row =>{
            if(row.status === 1){
            total = total + (row.product.pricings[0].price * row.quantity)
            }
          })
        })       
      }         
    }) 
    return total
  }

  statusOneToTwo(){
    this.services.find(service =>{
      service.details.find(detail =>{
        detail.rows.find(row =>{
          if (row.status === 1){
            row.status = 2;
          }
        })                
      })      
    })
    this.services.find(service =>{
      service.details.find(detail =>{
        if (detail.status === 1){
          detail.status = 2;
        }               
      })      
    })
    this.services.find(service =>{
      if (service.state === 1){
        service.state = 2;
      }   
    })
  }
}
