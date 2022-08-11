import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/SERVICES/user.service';
import { Router} from '@angular/router'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from'sweetalert2';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Sweet Alert string
  titleAlert : string='';
  //----------------Haciendo el formulario Reactivo

  contactForm= new FormGroup({
    email : new FormControl('',[Validators.required,Validators.minLength(1),Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(1)])
  });
  //Formulario no reactivo
  user = {
    email:'',
    password:''
  }

  constructor(
    private userService:UserService,
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {

  }

  /*Función Para login normal  */
  logIn(){
    this.user=this.contactForm.value;
    this.userService.signIn(this.user).subscribe(

      (res:any)=>{
        localStorage.setItem('token',res.token);
        swal.fire({
          icon: 'success',
          title: 'Ingreso exitoso',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['home']);
      },
      error =>{
        swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario y/o Contraseña Invalida',
        showConfirmButton: false,
        timer: 1500});
      }

    );//Subscribe end
  }
  /*Función para formulario Reactivo */
  send(){
    console.warn(this.contactForm.value);
  }

}
