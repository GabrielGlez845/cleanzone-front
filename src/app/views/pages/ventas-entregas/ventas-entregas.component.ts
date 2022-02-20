import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas-entregas',
  templateUrl: './ventas-entregas.component.html',
  styleUrls: ['./ventas-entregas.component.scss']
})
export class VentasEntregasComponent implements OnInit {
  name = localStorage.getItem('name');
  rol = localStorage.getItem('rol');
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    localStorage.setItem('token','');
    localStorage.setItem('isLoggedin','');
    localStorage.setItem('rolId','');
    localStorage.setItem('name','');
    localStorage.setItem('rol','');
    this.router.navigateByUrl('/auth');
  }

}
