import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators' 
@Injectable({
  providedIn: 'root'
})
export class EntregasService {
// private api = 'http://localhost:7000/api';
 private api = 'https://riotintorerias.com.mx/api'
  constructor(private http:HttpClient) { }

  DeliveriesAtTime(date:Date){
    return this.http.get(`${this.api}/deliveries/attime/${date}`).pipe(map(data=>{
      return data['data']
  }));  
  }
  DeliveriesAtTimeUser(date:Date,user:number){
    return this.http.get(`${this.api}/deliveries/attime/${date}/userId/${user}`).pipe(map(data=>{
      return data['data']
  }));  
  }

  DeliveriesfinishedEarrings(date:Date){
    return this.http.get(`${this.api}/deliveries/finishedEarrings/${date}`).pipe(map(data=>{
      return data['data']
  }))
  }

  DeliveriesfinishedEarringsUser(date:Date,user:number){
    return this.http.get(`${this.api}/deliveries/finishedEarrings/${date}/userId/${user}`).pipe(map(data=>{
      return data['data']
  }))
  }
  
  DeliveriesEarrings(date:Date){
    return this.http.get(`${this.api}/deliveries/earrings/${date}`).pipe(map(data=>{
      return data['data']
  }));
  }

  DeliveriesEarringsUser(date:Date,user:number){
    return this.http.get(`${this.api}/deliveries/earrings/${date}/userId/${user}`).pipe(map(data=>{
      return data['data']
  }));
  }

  DeliveriesPendignPayment(date:Date){
    return this.http.get(`${this.api}/deliveries/pendignPayment/${date}`).pipe(map(data=>{
      return data['data']
  }));
 }

  DeliveriesPendignPaymentUser(date:Date,user:number){
    return this.http.get(`${this.api}/deliveries/pendignPayment/${date}/userId/${user}`).pipe(map(data=>{
      return data['data']
  }));
  }

///details/identifier/:ide
  DeliveriesIdentifier(identifier:number){
    return this.http.get(`${this.api}/deliveries/details/identifier/${identifier}`).pipe(map(data=>{
      return data['data']
  }));
  }

  ///details/identifier/:ide
  DeliveriesId(id:number){
    return this.http.get(`${this.api}/deliveries/details/id/${id}`).pipe(map(data=>{
      return data['data']
  }));
  }

  ServiceById(id:number){
    return this.http.get(`${this.api}/services/id/${id}`).pipe(map(data=>{
      return data['data']
  }));
  }
}
