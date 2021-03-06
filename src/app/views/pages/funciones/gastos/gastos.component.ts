import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FuncionesService } from '../../../../services/funciones.service';
import { Transactions } from '../../../models/transactions.model';
import { resp } from '../../../models/login.model';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  GastoVariableFormGroup: FormGroup;
  transactionExpensive = 3;
  transactionEntry = 2;
  cargando = true;
  expenses:Transactions[] = [];
  menu = '';
  constructor(private _formBuilder: FormBuilder, private funcionesService:FuncionesService) {
    this.GastoVariableFormGroup = this._formBuilder.group({
      concept: ['', [Validators.required]],
      amount: ['', [Validators.required,Validators.pattern('^\\d+$')]],
      accountId: [null],                 
    });
   }

  ngOnInit(): void {
    this.getExpense();
  }

  getExpense(){
    this.funcionesService.getTransactionByType(this.transactionExpensive).subscribe((resp:resp) =>{
      this.expenses = resp.data as Transactions[];
      this.cargando = false;
    })
  }

  getCashEntry(){
    this.funcionesService.getTransactionByType(this.transactionEntry).subscribe((resp:resp) =>{
      this.expenses = resp.data as Transactions[];
      this.cargando = false;
    })
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

    //esta en el menu de entrada o de salida
    if (this.menu === 'salida'){
      this.GastoVariableFormGroup.controls['accountId'].setValue(3);
      this.funcionesService.postTransactionExpensive(this.GastoVariableFormGroup.value).subscribe((resp:any) => {
        if(resp.ok){
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'Gasto agregado con exito', icon: 'success'}
           );
           this.GastoVariableFormGroup.reset();
           this.getExpense();
        }else{
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: ' Error: ' + resp.err, icon: 'error'}
           );
        }
      },err => {
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: ' Error: Sucedio un error interno', icon: 'error'}
         );
      })
    }else if (this.menu === 'entrada'){
      //generar entrada
      this.GastoVariableFormGroup.controls['accountId'].setValue(2);
      this.funcionesService.postTransactionEntry(this.GastoVariableFormGroup.value).subscribe((resp:any) => {
        if(resp.ok){
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'Entrada registrada con exito', icon: 'success'}
           );
           this.GastoVariableFormGroup.reset();
           this.getCashEntry();
        }else{
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: ' Error: ' + resp.err, icon: 'error'}
           );
        }
      },err => {
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: ' Error: Sucedio un error interno', icon: 'error'}
         );
      })
    }else{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: ' Error: error al generar submenu', icon: 'error'}
       );
    }
    
  }
  
  generarGasto(){
    this.funcionesService.getProducts().subscribe((resp:any) =>{
      this.getExpense();
      this.GastoVariableFormGroup.reset();
      this.menu = 'salida';
    })
  }

  generarEntrada(){
    this.funcionesService.getClients().subscribe((resp:any) =>{
      this.getCashEntry()
      this.GastoVariableFormGroup.reset();
      this.menu = 'entrada';
  })
  }
  
}
