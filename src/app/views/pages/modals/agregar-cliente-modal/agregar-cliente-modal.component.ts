import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/clients.model';
import { FuncionesService } from '../../../../services/funciones.service';
import Swal from 'sweetalert2';
import { UserTypes } from '../../../models/user-types.model';

@Component({
  selector: 'app-agregar-cliente-modal',
  templateUrl: './agregar-cliente-modal.component.html',
  styleUrls: ['./agregar-cliente-modal.component.scss']
})
export class AgregarClienteModalComponent implements OnInit {
  ClienteFormGroup: FormGroup;
  userTypes: UserTypes[] = [];
  constructor(public activeModal: NgbActiveModal,
              private _formBuilder: FormBuilder,
              private funcionesService: FuncionesService) {
                this.ClienteFormGroup = this._formBuilder.group({
                  nombre: ['', [Validators.required]],
                  telefono: ['', [Validators.required,Validators.pattern('^\\d+$')]],
                  calle: ['', [Validators.required]],
                  colonia: ['', [Validators.required]],
                  codigoPostal: ['', [Validators.required,Validators.pattern('^\\d+$') ]],
                  listaPrecio: [null, [Validators.required]],                  
                });
               }

  ngOnInit(): void {
    this.funcionesService.getUserTypes().subscribe((resp:any)=>{
      this.userTypes = resp.data
    })
  }

  //Cliente
  get nombreNovalido() {
    return this.ClienteFormGroup.get('nombre')!.invalid && this.ClienteFormGroup.get('nombre')!.touched;
  }
  get telefonoNovalido() {
    return this.ClienteFormGroup.get('telefono')!.invalid && this.ClienteFormGroup.get('telefono')!.touched;
  }
  get calleNovalida() {
    return this.ClienteFormGroup.get('calle')!.invalid && this.ClienteFormGroup.get('calle')!.touched;
  }
  get coloniaNovalida() {
    return this.ClienteFormGroup.get('colonia')!.invalid && this.ClienteFormGroup.get('colonia')!.touched;
  }
  get codigoPostalNovalido() {
    return this.ClienteFormGroup.get('codigoPostal')!.invalid && this.ClienteFormGroup.get('codigoPostal')!.touched;
  }
  get listaPrecioNovalida() {
    return this.ClienteFormGroup.get('listaPrecio')!.invalid && this.ClienteFormGroup.get('listaPrecio')!.touched;
  }

  agregarCliente(){
    if (this.ClienteFormGroup.invalid) {
      return Object.values( this.ClienteFormGroup.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }
    
    let cliente:User;
    const date = new Date();
    cliente = {
      id:1,
      name:`${this.ClienteFormGroup.value.nombre}`,
      phone:`${this.ClienteFormGroup.value.telefono}`,
      street:`${this.ClienteFormGroup.value.calle}`,
      suburb:`${this.ClienteFormGroup.value.colonia}`,
      zip: this.ClienteFormGroup.value.codigoPostal,
      usertypeId: this.ClienteFormGroup.value.listaPrecio
    }
    console.log(cliente);
    this.funcionesService.postClient(cliente).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.ok){
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'creado con exito', icon: 'success'}
         );
         this.activeModal.close('modal cerrado');
       // this.router.navigate(['/ventas']);
      }
    },err =>{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
       );
    })
  }

  borraCliente(id: number){
    this.funcionesService.deleteClient(id).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.ok){
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'eliminado con exito', icon: 'info'}
         );
      }
    },err =>{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
       );
    })
  }
}
