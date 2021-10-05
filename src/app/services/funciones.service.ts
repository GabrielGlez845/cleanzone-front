import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators' 
import formatISO from 'date-fns/formatISO'
import { Service, Detail, Row } from '../views/models/sells.model';
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

}
