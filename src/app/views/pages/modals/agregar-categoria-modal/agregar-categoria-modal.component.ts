import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FuncionesService } from '../../../../services/funciones.service';
import { Category } from '../../../models/products.model';

@Component({
  selector: 'app-agregar-categoria-modal',
  templateUrl: './agregar-categoria-modal.component.html',
  styleUrls: ['./agregar-categoria-modal.component.scss']
})
export class AgregarCategoriaModalComponent implements OnInit {
  CategoriaFormGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private _formBuilder: FormBuilder,
              private funcionesService: FuncionesService) {
                this.CategoriaFormGroup = this._formBuilder.group({
                  nombre: ['', [Validators.required]],                 
                });
               }

  ngOnInit(): void {
  }

    //Cliente
    get nombreNovalido() {
      return this.CategoriaFormGroup.get('nombre')!.invalid && this.CategoriaFormGroup.get('nombre')!.touched;
    }

    agregarCategoria(){
      if (this.CategoriaFormGroup.invalid) {
        return Object.values( this.CategoriaFormGroup.controls).forEach(control => {
         if (control instanceof FormGroup ) {
          Object.values( control.controls).forEach(control => control.markAsTouched());
         } else {
            control.markAsTouched();
         }
       });
      }
      
      let categoria:Category;
      const date = new Date();
      categoria = {
        id:1,
        name:`${this.CategoriaFormGroup.value.nombre}`
      }
      this.funcionesService.postCategory(categoria).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.ok){
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'creado con exito', icon: 'success'}
           );
           this.activeModal.close('modal cerrado');
        }
      },err =>{
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
         );
      })
    }
  
    
}
