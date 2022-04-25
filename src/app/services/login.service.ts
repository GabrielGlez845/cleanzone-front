import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPost } from '../views/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 // private api = 'http://localhost:7000/api';
  private api = 'https://riotintorerias.com.mx/api'
  constructor(private http:HttpClient) { }

  login(data:LoginPost){
    return this.http.post(`${this.api}/employees/login`, {
      information: data,
    });
  }
}
