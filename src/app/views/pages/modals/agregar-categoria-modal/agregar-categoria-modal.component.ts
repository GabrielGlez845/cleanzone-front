import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
        name:`${this.CategoriaFormGroup.value.nombre}`,
        createdAt: date,
        updatedAt: date,
      }
      this.funcionesService.postCategory(categoria).subscribe((resp:any)=>{
        console.log(resp);
      })
      this.activeModal.close();
    }
  
    
}
