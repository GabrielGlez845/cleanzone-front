import { Component, OnInit } from '@angular/core';
import { VentasPAGService } from '../ventas/ventas-pag.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagarModalComponent } from '../../modals/pagar-modal/pagar-modal.component';
import { AgregarClienteModalComponent } from '../../modals/agregar-cliente-modal/agregar-cliente-modal.component';
import { AgregarPrendaModalComponent } from '../../modals/agregar-prenda-modal/agregar-prenda-modal.component';
import { User } from '../../../models/clients.model';
import { VentasService } from '../../../../services/ventas.service';
import { AgregarObservacionModalComponent } from '../../modals/agregar-observacion-modal/agregar-observacion-modal.component';
import { AgregarColorModalComponent } from '../../modals/agregar-color-modal/agregar-color-modal.component';
import { Color } from 'src/app/views/models/color.model';
import { Category, Product } from '../../../models/products.model';
import { Detail, Employee, Row, Service } from '../../../models/sells.model';

import { Canvas, Img, Line, PdfMakeWrapper,QR,Rect,Table,Txt } from 'pdfmake-wrapper';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FuncionesService } from '../../../../services/funciones.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  // selectedSearchPersonId: string = null;
  clients: User[] = [];
  cliente: User;
  empleado:Employee;
  idCliente: number;
  cargandoClientes = true;
  cargandoProductos = true;
  abecedario = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v']
  colores: Color[] = [];
  //Colores Predefinidos
  colors=[{id:1,nombre:'Amarillo',cantidad:1,class:'#FFE900',color:'#000000'},{id:2,nombre:'Azul',cantidad:1,class:'#0000FF',color:'#FFFFFF'},
          {id:3,nombre:'Blanco',cantidad:1,class:'#FFFFFF',color:'#000000'},  {id:4,nombre:'Cafe',cantidad:1 ,class:'#591F0B',color:'#FFFFFF'},
          {id:5,nombre:'Gris',cantidad:1 ,class:'#989898',color:'#000000'},{id:6,nombre:'Naranja',cantidad:1 ,class:'#EF7F1A',color:'#FFFFFF'},
          {id:7,nombre:'Negro',cantidad:1 ,class:'#2B2A29',color:'#FFFFFF'},{id:8,nombre:'Purpura',cantidad:1 ,class:'#7D2181',color:'#FFFFFF'},
          {id:9,nombre:'Rojo',cantidad:1 ,class:'#E60026',color:'#FFFFFF'}, {id:10,nombre:'Rosa',cantidad:1 ,class:'#FD6C9E',color:'#FFFFFF'},
          {id:11,nombre:'Verde',cantidad:1 ,class:'##1ED760',color:'#FFFFFF'},]
  categories:Category[];
  idCategoria:number;
  products:Product[];
  product: Product;  
  progreso: number;
  ids: number;
  animal: string;
  name: string;
  menu:string ='cliente';
  menuColorobservacion: string = 'cliente' ;
  //buscar-prenda
  isCollapsed = true;
  cantidadColor:number = 1;
  selectedPersonId: string = null;
  selectedColor: any = null;
  selectedObservation: any = null;
  cantidad = 1;
  observacion = '';
  observaciones: any[] = [{ id: 1, nombre: 'sucio', alias: 'sc', seleccionado: false }, { id: 2, nombre: 'roto', seleccionado: false, alias: 'rt' }, { id: 3, nombre: 'decolorado', seleccionado: false, alias: 'dl' }, { id: 4, nombre: 'descocido', seleccionado: false, alias: 'dc' }]
 colorMenu:string = '';
 colorMenuA:boolean = false;
  constructor(private modalService: NgbModal, 
              private router: Router, 
              public ventasServicePAG: VentasPAGService,
              private ventasService:VentasService,
              private funcionesService:FuncionesService) {                 
                         
  }

  async ngOnInit(): Promise<void> {
   this.getClients();
   this.obtenerCategorias();
   this.obtenerEmpleado();
  

  }

  obtenerEmpleado(){
    this.funcionesService.getEmployee(+localStorage.getItem('employeeId')).subscribe((resp:any)=>{
        this.empleado = resp.data
    })
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }
  openModalPagar() {
    const modalRef = this.modalService.open(PagarModalComponent)
    let total = this.ventasServicePAG.totalAmount();
    modalRef.componentInstance.total = total;
    modalRef.componentInstance.serviceId = this.ventasServicePAG.venta.id;
    modalRef.componentInstance.tipo = 'ventas';
  }

  openModalPrendasAgregar() {
    this.modalService.open(AgregarPrendaModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
    }).catch((res) => { });
  }

  openModalClienteAgregar() {
    this.modalService.open(AgregarClienteModalComponent, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
      this.router.navigate(['/ventas']);
    }).catch((res) => { });
  }


  agregarId(id: string) {  
    if(id === ''){      
      return
    }
    const date = new Date();
    let detalle:Detail = {
      id:parseInt(id),
      identifier:parseInt(id),
      ticket:'',
      status: 0,
      serviceId:this.ventasServicePAG.venta.id
    }
    console.log(detalle)
    this.ventasServicePAG.agregarId(detalle);
    this.ids = null
  }


  cantidadVentas(ide: number, cantidad: number, price: number) {
    this.ventasServicePAG.Fila.find(row => {
      if (row.id === ide) {
        if (row.quantity === 1 && cantidad < 0) {
          return;
        }
        row.quantity += cantidad
        
        //row.product.pricings[0].price = price * row.quantity
      }
    })
  }
  
  openModalAgregarObservacion(id:number) {
   const modalRef = this.modalService.open(AgregarObservacionModalComponent)
   modalRef.componentInstance.id = id;
  }

  openModalAgregarColor(id:number) {
    const modalRef = this.modalService.open(AgregarColorModalComponent)
    modalRef.componentInstance.id = id;
   }

  menuCambiar(opcion:string){
    if (this.menu === opcion){
      // '' = swicht default
      this.menu = '';
     }else{
      this.menu = opcion;
     }
   
  }

  menuColorObervaciones(opcion:string){
    
    if (this.menuColorobservacion === opcion){
      // '' = swicht default
      this.menuColorobservacion = '';
     }else{
      this.menuColorobservacion = opcion;
     }
  }
   
   

  //buscar prenda

  cambiarCantidadPrenda(cantidad: number) {
    if (this.cantidad === 1 && cantidad < 0) {
      return
    }
    this.cantidad += cantidad
  }

  cambiarCantidadColor(cantidad:number,colorNew:Color) {
    let h = 0 ;
    this.colores.find(color=>{
        if(color.id === colorNew.id){        
            if ( color.cantidad === 1 && cantidad < 0) {
              return
            }
          color.cantidad += cantidad
        }
      h++;
    })
  }
  
  agregarPrenda() {
    // let i=0;
   let color = '';
   this.colores.forEach(colorIn =>{
     color += `${colorIn.cantidad} .- ${colorIn.nombre}, `
   })
    // Concatenar observaciones
    this.observaciones.forEach(observa => {
      if (observa.seleccionado) {
        this.observacion += ' ' + observa.alias + ','
      }
    })

    const date = new Date();
    let Fila:Row = {
      id:date.getTime(),
      quantity: this.cantidad,
      colors: color,
      observations: this.observacion,
      productId:this.product.id,
      status:0,
      product:this.product,
      detailId: this.ventasServicePAG.selected
    }

    //this.ventaDetalle.product.push(this.product)

    this.ventasServicePAG.agregarIdDetalle(Fila);
    this.ventasServicePAG.ventaDetalle.forEach(id => {
      console.log(id);
    })
    //reset
    this.colores = [];
    this.observaciones =  [{ id: 1, nombre: 'sucio', alias: 'sc', seleccionado: false }, { id: 2, nombre: 'roto', seleccionado: false, alias: 'rt' }, { id: 3, nombre: 'decolorado', seleccionado: false, alias: 'dl' }, { id: 4, nombre: 'descocido', seleccionado: false, alias: 'dc' }];
    this.observacion = ''
    this.menuColorobservacion = ''
  }

  //change
  agregarNuevoColor(color:Color){
    
    let colorC:Color = {
      id:color.id,
      nombre:color.nombre,
      cantidad:color.cantidad
    }

    console.log('color'+color)
    this.colores.push(colorC)
    
   // this.CantidadColor1 = cantidad;

    this.colorMenu = '';
    this.menuColorobservacion = '';
    this.colorMenuA = false
  }

  //new
  //Clientes
  getClients(){
    this.ventasService.getClients().subscribe((resp:User[])=>{
        this.clients = resp;        
    })
  }

  clienteSeleccionado(id:any){
    console.log('id',id)    
    this.idCliente = id;
    if (id == null){
      this.cargandoClientes = true
    }
    else{
    this.clients.find(cliente=>{
      if(cliente.id === id){
        if(this.ventasServicePAG.venta === undefined){
          const date = new Date();
          this.ventasServicePAG.venta={
            id:date.getTime(),
            state:0,
            employeeId: parseInt(localStorage.getItem('employeeId')), //Ya se deberia tener el empleado
            employee: this.empleado,
            userId:cliente.id,
            user:cliente,
            createdAt:new Date()
          }
          //new 
          this.cliente = cliente
          this.ventasServicePAG.venta.userId = cliente.id
          this.ventasServicePAG.venta.employeeId = this.empleado.id
          this.cargandoClientes = false
        }else{
        this.cliente = cliente
        this.ventasServicePAG.venta.userId = cliente.id
        this.ventasServicePAG.venta.employeeId = this.empleado.id
        this.cargandoClientes = false
        }
      }
    })
   }
  }

  nuevoColor(colorNew:Color){     
    let bandera = true 
    this.colores.find(color=>{
      if(color.id === colorNew.id){        
       color.cantidad += 1
       bandera = false
      } 
  })    
      if(bandera){
        this.colores.push(colorNew)
      }
  }

    eliminarColor(id:number){
      for (var i = 0,len = this.colores.length; i < len; i++) {
        if(this.colores[i].id === id){   
          this.colores.splice(i, 1)
          len = this.colores.length
        }
     }            
  }

  //Categories
  obtenerCategorias(){
    this.ventasService.getCategories().subscribe((resp:Category[])=>{
        console.log(resp)
        this.categories = resp;

    })
  }

  //Products
  obtenerProductosCategoriaLetra(letra:string){  
    if (this.idCategoria != null){
      this.ventasService.getProductsCategoryLetter(this.idCategoria,letra).subscribe((resp:Product[])=>{
        console.log(resp);
        this.products = resp
      
      })
    }  
    
  }
}





