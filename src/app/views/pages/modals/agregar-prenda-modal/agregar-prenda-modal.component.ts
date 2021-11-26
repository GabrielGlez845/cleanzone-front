import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FuncionesService } from '../../../../services/funciones.service';
import { Usertype, Category, Product, Pricing } from '../../../models/products.model';

@Component({
  selector: 'app-agregar-prenda-modal',
  templateUrl: './agregar-prenda-modal.component.html',
  styleUrls: ['./agregar-prenda-modal.component.scss']
})
export class AgregarPrendaModalComponent implements OnInit {
  PrendaFormGroup: FormGroup;
  userTypes: Usertype[]=[];
  categories: Category[] = [];
  constructor(public activeModal: NgbActiveModal,
              private _formBuilder: FormBuilder,
              private funcionesService: FuncionesService) {
                this.PrendaFormGroup = this._formBuilder.group({
                  nombre: ['', [Validators.required]],
                  precio: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  categoria: [null, [Validators.required]],
                  listaPrecio: [null, [Validators.required]],                 
                });
               }

  ngOnInit(): void {
    this.funcionesService.getUserTypes().subscribe((resp:any)=>{
      this.userTypes = resp.data
    })
    this.funcionesService.getCategories().subscribe((resp:any) =>{
      this.categories = resp.data
    });
  }

  
  //Prenda
  get nombreNovalido() {
    return this.PrendaFormGroup.get('nombre')!.invalid && this.PrendaFormGroup.get('nombre')!.touched;
  }
  get precioNovalido() {
    return this.PrendaFormGroup.get('precio')!.invalid && this.PrendaFormGroup.get('precio')!.touched;
  }
  get categoriaNovalida() {
    return this.PrendaFormGroup.get('categoria')!.invalid && this.PrendaFormGroup.get('categoria')!.touched;
  }
  get listaPrecioNovalida() {
    return this.PrendaFormGroup.get('listaPrecio')!.invalid && this.PrendaFormGroup.get('listaPrecio')!.touched;
  }

  agregarPrenda(){
    if (this.PrendaFormGroup.invalid) {
      return Object.values( this.PrendaFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }
    
    let product:Product;
    const date = new Date();
    product = {
      id:1,
      name:`${this.PrendaFormGroup.value.nombre}`,
      categoryId: this.PrendaFormGroup.value.categoria
    }

    this.funcionesService.postProduct(product).subscribe((resp:any)=>{
      console.log(resp);
      let pricing:Pricing
          pricing = {
          id:1,
          price: this.PrendaFormGroup.value.precio,
          usertypeId: this.PrendaFormGroup.value.listaPrecio,
          productId:resp.data.id
        }
        this.funcionesService.postPricings(pricing).subscribe((resp:any) =>{
          console.log(resp);
          if(resp.ok){
            Swal.fire(
              { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'creado con exito', icon: 'success'}
             );
             this.activeModal.close('modal cerrado');
          }
        },err =>{
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'error precio', icon: 'error'}
           );
        })

    },err =>{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'error producto', icon: 'error'}
       )
      })
  }

  borraPrenda(id: number){
    this.funcionesService.deleteProduct(id).subscribe((resp:any)=>{
      console.log(resp)
    })
  }
}


