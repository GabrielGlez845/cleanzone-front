import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserTypes } from 'src/app/views/models/user-types.model';
import Swal from 'sweetalert2';
import { UserTypesService } from '../../../../services/user-types.service';
import { Pricing } from '../../../models/products.model';

@Component({
  selector: 'app-precios-prenda',
  templateUrl: './precios-prenda.component.html',
  styleUrls: ['./precios-prenda.component.scss']
})
export class PreciosPrendaComponent implements OnInit {
  @Input() productId; 

  OneuserType: UserTypes  = null;
  priceId = 0;

  userTypes:UserTypes[] = [] ;
  UsertypeFormGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal, private userTypesService:UserTypesService,
              private _formBuilder: FormBuilder) { 
    this.UsertypeFormGroup = this._formBuilder.group({
      precio: [null, [Validators.required,Validators.pattern('^\\d+$') ]],          
    });
  }

  ngOnInit(): void {
    this.obtenerTiposUsuarios(this.productId);
  }

  get precioNovalido() {
    return this.UsertypeFormGroup.get('precio')!.invalid && this.UsertypeFormGroup.get('precio')!.touched;
  }

  async obtenerTiposUsuarios(productId:number){
      this.userTypes = await this.userTypesService.obtenerTiposUsuarios(productId);
  }

  async agregarNuevoPrecio(){
    if (this.UsertypeFormGroup.invalid) {
      return Object.values( this.UsertypeFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }

    const body = {
      price : this.UsertypeFormGroup.value['precio'],
      usertypeId: this.OneuserType.id,
      productId: this.productId
    }

    const resp:any = await this.userTypesService.agregarNuevoPrecio(body);

    if (resp.ok){
      this.UsertypeFormGroup.reset();
      this.OneuserType = null
      this.obtenerTiposUsuarios(this.productId);
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title:'creado con exito', icon: 'success'}
       );
    }else{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'sucedio un error inesperado', icon: 'error'}
       );
    }
  }

  colocarPrecioModificado(pricing:Pricing,usertype:UserTypes){
    this.priceId = pricing.id
    this.OneuserType = usertype
    this.UsertypeFormGroup.controls['precio'].setValue(pricing.price);
  }

  async modificarPrecio(){
    if (this.UsertypeFormGroup.invalid) {
      return Object.values( this.UsertypeFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }

    const body = {
      price : this.UsertypeFormGroup.value['precio']
    }

    const resp:any = await this.userTypesService.modificarPrecio(this.priceId,body);

    if (resp.ok){
      this.UsertypeFormGroup.reset();
      this.OneuserType = null
      this.obtenerTiposUsuarios(this.productId);
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title:'modificado con exito', icon: 'success'}
       );
    }else{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'sucedio un error inesperado', icon: 'error'}
       );
    }
    
  }

  async eliminarPrecio(id:number){
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      width: 400
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp:any = await this.userTypesService.eliminarPrecio(id)
        if (resp.ok){
          console.log(resp)
          this.obtenerTiposUsuarios(this.productId);
        }
       
        } 
    })    
    
  }

}
