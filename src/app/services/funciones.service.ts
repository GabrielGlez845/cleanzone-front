import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators' 
import formatISO from 'date-fns/formatISO'
import { Service, Detail, Row, Employee } from '../views/models/sells.model';
import { User } from '../views/models/clients.model';
import { Product, Category, Usertype, Pricing } from '../views/models/products.model';
@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  private api = 'http://localhost:7000/api';
  constructor(private http:HttpClient) { }

  //status 
  statusAtTime(date:Date){
    return this.http.get(`${this.api}/status/attime/${date}`).pipe(map(data=>{
      return data['data']
  }));
  }

  StatusfinishedEarrings(date:Date){
    return this.http.get(`${this.api}/status/finishedEarrings/${date}`).pipe(map(data=>{
      return data['data']
  }))
  }

  StatusEarrings(date:Date){
    return this.http.get(`${this.api}/status/earrings/${date}`).pipe(map(data=>{
      return data['data']
  }));
  }

  StatusDetailsId(id:number){
    return this.http.get(`${this.api}/status/details/id/${id}`).pipe(map(data=>{
      return data['data']
  }));
  }

  statusChangeService(services:Service){
      return this.http.put(`${this.api}/status/change/service`,services)
  }

  statusChangeDetail(details:Detail[]){
    return this.http.put(`${this.api}/status/change/detail`,details)
  }

  statusChangeRow(rows:Row[]){
    return this.http.put(`${this.api}/status/change/row`,rows)
  }

  //notes
  notesSearch(clienteId?:number, finish?:Date, start?:Date ,type?:number){   
    let params = {}    
    if (clienteId){
    params = {clienteId:clienteId};  
    }
    if (finish && start){
      params = {finish:finish,start:start};  
    }
    if (clienteId && finish && start){
      params = {clienteId:clienteId, finish:finish,start:start};
    }
    return this.http.get(`${this.api}/notes`,{ 
      params: params,
      withCredentials: false
    }).pipe(map(data=>{
        return data['rows']
    }))   
  }

  serviceById(id:number){
    return this.http.get(`${this.api}/services/id/${id}`).pipe(map(data=>{
      return data['data']
  }));    
  }

  //clients
  clientRecords(id:number){
    return this.http.get(`${this.api}/users/record/${id}`);
  }

  //configurations
  //client
  getClients(){
    return this.http.get(`${this.api}/users/`);
  }

  postClient(client:User){
    return this.http.post(`${this.api}/users/`, {
      information: client,
    });
  }

  deleteClient(clientId:number){
    return this.http.delete(`${this.api}/users/${clientId}`);
  }

  //product
  getProducts(){
    return this.http.get(`${this.api}/products`);
  }

  postProduct(product:Product){
    return this.http.post(`${this.api}/products/`, {
      information: product,
    });
  }

  deleteProduct(productId:number){
    return this.http.delete(`${this.api}/products/${productId}`);
  }

  //categori
  getCategories(){
    return this.http.get(`${this.api}/categories`);
  }
  postCategory(category:Category){
    return this.http.post(`${this.api}/categories/`, {
      information: category,
    });
  }

  deleteCategory(categoryId:number){
    return this.http.delete(`${this.api}/categories/${categoryId}`);
  }
//employ
  getEmployees(){
    return this.http.get(`${this.api}/employees`);
  }
  postEmployee(employee:Employee){
    return this.http.post(`${this.api}/employees/`, {
      information: employee,
    });
  }

  deleteEmployee(employeeId:number){
    return this.http.delete(`${this.api}/employees/${employeeId}`);
  }

  getUserTypes(){
    return this.http.get(`${this.api}/userType`);
  }

  postUserTypes(usertype:Usertype){
    return this.http.post(`${this.api}/userType`, {
      information: usertype,
    });
  }

  getRols(){
    return this.http.get(`${this.api}/roles`);
  }

  postPricings(pricing:Pricing){
    return this.http.post(`${this.api}/pricings`, {
      information: pricing,
    });
  }
}
