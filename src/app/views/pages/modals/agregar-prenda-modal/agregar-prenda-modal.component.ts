import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
                  categoria: ['', [Validators.required]],
                  listaPrecio: ['', [Validators.required]],                 
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
      createdAt: date,
      updatedAt: date,
      categoryId: this.PrendaFormGroup.value.categoria
    }

    this.funcionesService.postProduct(product).subscribe((resp:any)=>{
      console.log(resp);
      let pricing:Pricing
          pricing = {
          id:1,
          price: this.PrendaFormGroup.value.precio,
          createdAt:date,
          updatedAt:date,
          usertypeId: this.PrendaFormGroup.value.listaPrecio,
          productId:resp.data.id
        }
        this.funcionesService.postPricings(pricing).subscribe(resp =>{
          console.log(resp);
        })

    })
    this.activeModal.close();
  }

  borraPrenda(id: number){
    this.funcionesService.deleteProduct(id).subscribe((resp:any)=>{
      console.log(resp)
    })
  }
}


