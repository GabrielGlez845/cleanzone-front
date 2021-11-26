import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../services/login.service';
import { LoginGet, resp } from '../../../models/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  loginFormGroup: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute,private fm: FormBuilder,
              private loginService:LoginService) {
    this.loginFormGroup = this.fm.group({
      email: [null, [Validators.required]],
      password: [null ,[Validators.required]]
    });
   }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e) {
    e.preventDefault();
    if (this.loginFormGroup.valid){
      console.log(this.loginFormGroup.value)
      this.loginService.login(this.loginFormGroup.value).subscribe((resp:LoginGet)=>{
        if(resp.ok){
          Swal.fire(
            { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'Accedio con exito', icon: 'success'}
           );
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('employeeId', resp.data.id+'');
          localStorage.setItem('token', resp.token);
          if (localStorage.getItem('isLoggedin')) {
            this.router.navigate([this.returnUrl]);
          }
        }
      },err =>{
        Swal.fire(
          { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: err.error.err, icon: 'error'}
         );
      })
    }
  }

  logout(): void{
    localStorage.setItem('token','');
    this.router.navigateByUrl('/login');
  }

}
