import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTypesService {
 // private api = 'http://localhost:7000/api';
  private api = 'https://riotintorerias.com.mx/api'

  constructor(private http:HttpClient) { }

  async obtenerTiposUsuarios(productId :number){
    const resp:any = await this.http.get(`${this.api}/userType/${productId}`).toPromise()
    return resp.data;
  }

  async agregarNuevoPrecio(body:any){
    return this.http.post(`${this.api}/pricings`,{information:body}).toPromise()
  }

  async modificarPrecio(id:number,body:any){
    return this.http.put(`${this.api}/pricings/${id}`,body).toPromise()
  }

  async eliminarPrecio(id:number){
    return this.http.delete(`${this.api}/pricings/${id}`).toPromise()
  }
}
