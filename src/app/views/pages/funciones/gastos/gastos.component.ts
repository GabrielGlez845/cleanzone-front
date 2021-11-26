import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FuncionesService } from '../../../../services/funciones.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  GastoVariableFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private funcionesService:FuncionesService) {
    this.GastoVariableFormGroup = this._formBuilder.group({
      concept: ['', [Validators.required]],
      amount: ['', [Validators.required,Validators.pattern('^\\d+$')]],
      accountId: [3],                 
    });
   }

  ngOnInit(): void {
  }

   //Cliente
   get conceptoNovalido() {
    return this.GastoVariableFormGroup.get('concept')!.invalid && this.GastoVariableFormGroup.get('concept')!.touched;
  }
  get importeNovalido() {
    return this.GastoVariableFormGroup.get('amount')!.invalid && this.GastoVariableFormGroup.get('amount')!.touched;
  }

  agregarGastoVariable(){
    if (this.GastoVariableFormGroup.invalid) {
      return Object.values( this.GastoVariableFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }
    this.funcionesService.postTransaction(this.GastoVariableFormGroup.value).subscribe((resp:any) => {
      if(resp.ok){
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'Pago agregado con exito', icon: 'success'}
         );
         this.GastoVariableFormGroup.reset();
      }
    },err => {
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: ' Error: '+err.error.err.errors[0].message, icon: 'error'}
       );
    })
  }
  
  
}
