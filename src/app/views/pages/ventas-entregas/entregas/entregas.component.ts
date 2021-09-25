import { Component, OnInit, AfterViewInit,ElementRef, HostListener, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Person, PeoplesData } from '../../../../core/dummy-datas/peoples.data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2' 

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.scss']
})
export class EntregasComponent implements OnInit {

  cuenta:any[] = [{id:'587', nNOta:'5670',nTicket:'(128) (129)'},
  {id:'587', nNOta:'5671',nTicket:'(123) (122)'},
  {id:'587', nNOta:'5672',nTicket:'(168) (134)'}];
detalle:any[] = [{id:'234', cuenta_id:'587', nombre:'pantolones', cantidad:'3', status:'4', colores:'rojo verde azul'},
   {id:'235', cuenta_id:'587', nombre:'camisetas', cantidad:'3', status:'2', colores:'rojo verde azul'},
   {id:'236', cuenta_id:'587', nombre:'short', cantidad:'3', status:'2', colores:'rojo verde azul'}];
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  table = false;
  tableF = false;
  menuEntregas:string;
  selectedSearchPersonId: string = null;
  people: Person[] = [];
  
  bNota= false;
  menu:string;


constructor(private router: Router, private modalService: NgbModal) {
  this.fetch(data => {
  this.rows = data;
    setTimeout(() => {
    this.loadingIndicator = false;
    }, 1500);
    });
}

ngOnInit(): void {
this.people = PeoplesData.peoples;

}

ngAfterViewInit(): void {

}


regresar() {
  this.router.navigate(['/dashboard']);
}

fetch(cb) {
  const req = new XMLHttpRequest();
  req.open('GET', `assets/data/100k.json`);
  
  req.onload = () => {
  cb(JSON.parse(req.response));
  };
  
  req.send();
}

  menuEntregasF(opcion: string){
    if (this.menuEntregas === opcion){
    this.menuEntregas = '';
    }else{
    this.menuEntregas=opcion
    }
  
  }
  
  menuF(opcion: string){
    if (this.menu === opcion){
    this.menu = '';
    }else{
    this.menu=opcion
    }
  
  }

  openModalPagar(content) {
    this.modalService.open(content,).result.then((result) => {
    console.log('Modal closed' + result);
    }).catch((res) => { });
  }
  
  buscarNotaDia(){
    this.bNota=!this.bNota
    if (this.bNota) {
    Swal.fire({
    icon: 'info',
    title: 'Observaciones',
    text: ' SE QUEDA PENDIENTE PANTALON DE ID 5670 (128) POR PROCESO '
    });
    }    
  }

  buscarNotaTerminada(){
    this.bNota=!this.bNota 
  }


}
