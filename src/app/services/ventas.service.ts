import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators' 
import { Service, Payment, Detail, Row } from '../views/models/sells.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private api = 'http://localhost:7000/api';

  constructor( private http: HttpClient ) {  }

  getClients(){
   return this.http.get(`${this.api}/users`).pipe(map(data=>{
       return data['data']
   }))
  }

  getCategories(){
    return this.http.get(`${this.api}/categories`).pipe(map(data=>{
        return data['data']
    }))
   }

  getProductsCategoryLetter(category_id:number,letter:string){
    return this.http.get(`${this.api}/products/category/${category_id}/letter/${letter}`).pipe(map(data=>{
        return data['data']
    }))
  }
  
  getEmployeeById(id:number){
    return this.http.get(`${this.api}/employees/id/${id}`).pipe(map(data=>{
      return data['data']
    }))
  }

  getLastDate(){
    return this.http.get(`${this.api}/services/last`).pipe(map(data=>{
      return data['data']
    }))
  }

  getLastService(date:any){
    return this.http.get(`${this.api}/services/date/${date}`).pipe(map(data=>{
      return data['data']
    }))
  }

  postService(service: Service){
     return this.http.post(`${this.api}/services`,service)
  }

  putService(service:Service){
    return this.http.put(`${this.api}/services`,service)
  }

  postDetail(details:Detail[]){
    return this.http.post(`${this.api}/details`,details)
  }

  getDetailByIdentifier(identifier:number){
    return this.http.get(`${this.api}/details/identifier/${identifier}`).pipe(map(data=>{
      return data['data']
    }))
  }

  postRows(rows:Row[]){
    return this.http.post(`${this.api}/rows`,rows)
  }

  postPayments(payment: Payment){
    return this.http.post(`${this.api}/payments`,payment)
  }
}


//verificar como llega los arrglos al backend y agregarlos