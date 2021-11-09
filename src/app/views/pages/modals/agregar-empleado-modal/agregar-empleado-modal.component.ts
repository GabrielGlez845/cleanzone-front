import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role, Employee } from '../../../models/sells.model';
import { FuncionesService } from '../../../../services/funciones.service';

@Component({
  selector: 'app-agregar-empleado-modal',
  templateUrl: './agregar-empleado-modal.component.html',
  styleUrls: ['./agregar-empleado-modal.component.scss']
})
export class AgregarEmpleadoModalComponent implements OnInit {

  EmpleadoFormGroup: FormGroup;
  Rols: Role[] = [];
  constructor(public activeModal: NgbActiveModal,
              private _formBuilder: FormBuilder,
              private funcionesService: FuncionesService) {
                this.EmpleadoFormGroup = this._formBuilder.group({
                  nombre: ['', [Validators.required]],
                  email: ['', [Validators.required,Validators.pattern('^\\d+$')]],
                  contraseña: ['', [Validators.required]],
                  rol: [null, [Validators.required]]             
                });
               }

  ngOnInit(): void {
    this.funcionesService.getRols().subscribe((resp:any)=>{
      this.Rols = resp.data
    })
  }

   //Empleado
   get nombreNovalido() {
    return this.EmpleadoFormGroup.get('nombre')!.invalid && this.EmpleadoFormGroup.get('nombre')!.touched;
  }
  get emailNovalido() {
    return this.EmpleadoFormGroup.get('email')!.invalid && this.EmpleadoFormGroup.get('email')!.touched;
  }
  get contrasenaNovalida() {
    return this.EmpleadoFormGroup.get('contraseña')!.invalid && this.EmpleadoFormGroup.get('contraseña')!.touched;
  }
  get rolNovalido() {
    return this.EmpleadoFormGroup.get('rol')!.invalid && this.EmpleadoFormGroup.get('rol')!.touched;
  }

  agregarEmpleado(){
    if (this.EmpleadoFormGroup.invalid) {
      return Object.values( this.EmpleadoFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }
    
    let empleado:Employee;
    const date = new Date();
    empleado = {
      id:1,
      name:`${this.EmpleadoFormGroup.value.nombre}`,
      email:`${this.EmpleadoFormGroup.value.email}`,
      password:`${this.EmpleadoFormGroup.value.contraseña}`,
      createdAt: date,
      updatedAt: date,
      roleId: this.EmpleadoFormGroup.value.rol
    }
    this.funcionesService.postEmployee(empleado).subscribe((resp:any)=>{
      console.log(resp);
    })
    this.activeModal.close();
  }

  borraEmpleado(id: number){
    this.funcionesService.deleteEmployee(id).subscribe((resp:any)=>{
      console.log(resp)
    })
  }

}
