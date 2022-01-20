import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, Role } from '../../../models/sells.model';
import { FuncionesService } from '../../../../services/funciones.service';
import { PaymentCC } from 'src/app/views/models/cashcut.model';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.scss']
})
export class CorteComponent implements OnInit {
  cashCutFormGroup: FormGroup;
  employees:Employee[] = [];
  rols:Role[] = [];
  cargando = true;
  payments:PaymentCC[] = [];
  totalCaja:number = 0;
  totalCliente:number = 0;
  constructor(private fm: FormBuilder, private funcionesService:FuncionesService) {
    this.cashCutFormGroup = this.fm.group({
      roleId: [null, [Validators.required]],
      employeeId: [null]
    });
   }


  ngOnInit(): void {
    this.funcionesService.getRols().subscribe((resp:any)=>{
      this.rols = resp.data
    })
    this.funcionesService.getEmployees().subscribe((resp:any)=>{
      this.employees = resp.data
      this.cargando = false;
    })
  }

    //Cashcut
    get categoriaNovalida() {
      return this.cashCutFormGroup.get('roleId')!.invalid && this.cashCutFormGroup.get('roleId')!.touched;
    }
    get empleadoNovalido() {
      return this.cashCutFormGroup.get('employeeId')!.invalid && this.cashCutFormGroup.get('employeeId')!.touched;
    }

    cashCut(){
      if (this.cashCutFormGroup.invalid) {
        return Object.values( this.cashCutFormGroup.controls).forEach(control => {
         if (control instanceof FormGroup ) {
          Object.values( control.controls).forEach(control => control.markAsTouched());
         } else {
            control.markAsTouched();
         }
       });
      }
      console.log('cashcut',this.cashCutFormGroup.value)
      this.funcionesService.getcashCut(this.cashCutFormGroup.value).subscribe((resp:any)=>{
        this.payments = resp.data as PaymentCC[]
        this.payments.forEach(p=>{
          //dinero en caja
          if (p.transaction.accountId = 2 ){
            this.totalCaja += p.amount
          }else{ //dinero no disponible
            this.totalCliente += p.amount
          }
        })
      })
    }

}
