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
import Swal from 'sweetalert2';

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

  ngOnInit(): void {}
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
      this.buscarCliente()
    }).catch((res) => { });
    
  }

  openModalPrendaAgregar() {
    this.modalService.open(AgregarPrendaModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
      this.buscarPrenda();
    }).catch((res) => { });
  }

  openModalEmpleadoAgregar() {
    this.modalService.open(AgregarEmpleadoModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
      this.buscarEmpleado();
    }).catch((res) => { });
  }

  openModalCategoriaAgregar() {
    this.modalService.open(AgregarCategoriaModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
      this.buscarCategoria();
    }).catch((res) => { });
  }

  borraCategoria(id: number){
    this.funcionesService.deleteCategory(id).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.ok){
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'eliminado con exito', icon: 'info'}
         );
      }
      this.buscarCategoria();
    },err =>{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
       );
      
    })
  }

  borraEmpleado(id: number){
    this.funcionesService.deleteEmployee(id).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.ok){
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'eliminado con exito', icon: 'info'}
         );
      }
      this.buscarEmpleado();
    },err =>{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
       );
    })
  }

  borraPrenda(id: number){
    this.funcionesService.deleteProduct(id).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.ok){
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'eliminado con exito', icon: 'info'}
         );
      }
      this.buscarPrenda();
    },err =>{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
       );
    })
  }

  borraCliente(id: number){
    this.funcionesService.deleteClient(id).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.ok){
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'eliminado con exito', icon: 'info'}
         );
      }
      this.buscarCliente();
    },err =>{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
       );
    })
  }
}
