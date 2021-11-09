import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/clients.model';
import { Product, Category } from '../../../models/products.model';
import { FuncionesService } from '../../../../services/funciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarClienteModalComponent } from '../../modals/agregar-cliente-modal/agregar-cliente-modal.component';
import { AgregarPrendaModalComponent } from '../../modals/agregar-prenda-modal/agregar-prenda-modal.component';
import { AgregarCategoriaModalComponent } from '../../modals/agregar-categoria-modal/agregar-categoria-modal.component';
import { Employee } from '../../../models/sells.model';
import { AgregarEmpleadoModalComponent } from '../../modals/agregar-empleado-modal/agregar-empleado-modal.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  clients: User[];
  products:Product[];
  categories: Category[];
  employees: Employee[];
  menuEntregas:string;
  menu:string;
  constructor(private funcionesService:FuncionesService, private modalService: NgbModal, ) { }

  ngOnInit(): void {
  }
/*
  menuF(opcion: string){
    if (this.menu === opcion){
    this.menu = '';
    }else{
    this.menu=opcion
    }  
  }*/

  buscarCliente(){
    this.funcionesService.getClients().subscribe((resp:any) =>{
        this.clients = resp.data;
        this.menu = 'cliente';
    })
  }

  buscarPrenda(){
  this.funcionesService.getProducts().subscribe((resp:any) =>{
    this.products = resp.data
    this.menu = 'prenda';
  })
  }

  buscarEmpleado(){
    this.funcionesService.getEmployees().subscribe((resp:any) =>{
      this.employees = resp.data
      this.menu = 'empleado';
    })
    }

  buscarCategoria(){
    this.funcionesService.getCategories().subscribe((resp:any) =>{
      this.categories = resp.data
      this.menu = 'categoria';
    })
  }

  openModalClienteAgregar() {
    this.modalService.open(AgregarClienteModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
    }).catch((res) => { });
  }

  openModalPrendaAgregar() {
    this.modalService.open(AgregarPrendaModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
    }).catch((res) => { });
  }

  openModalEmpleadoAgregar() {
    this.modalService.open(AgregarEmpleadoModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
    }).catch((res) => { });
  }

  openModalCategoriaAgregar() {
    this.modalService.open(AgregarCategoriaModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
    }).catch((res) => { });
  }

  borraCategoria(id: number){
    this.funcionesService.deleteCategory(id).subscribe((resp:any)=>{
      console.log(resp)
    })
  }

  borraEmpleado(id: number){
    this.funcionesService.deleteEmployee(id).subscribe((resp:any)=>{
      console.log(resp)
    })
  }

  borraPrenda(id: number){
    this.funcionesService.deleteProduct(id).subscribe((resp:any)=>{
      console.log(resp)
    })
  }

  borraCliente(id: number){
    this.funcionesService.deleteClient(id).subscribe((resp:any)=>{
      console.log(resp)
    })
  }
}
