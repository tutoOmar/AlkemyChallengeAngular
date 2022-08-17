import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/SERVICES/user.service';
import { Router} from '@angular/router'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //Sweet Alert string
  titleAlert : string='';
  //----------------Haciendo el formulario Reactivo

  contactForm= new FormGroup({
    email : new FormControl('',[Validators.required,Validators.minLength(1),Validators.email]),//Valores validos, que el email sea tipo email, que sea minimo de 1 de longitus y es requerido, estas ultimas condiciones son al final el mismo requerimiento
    password : new FormControl('',[Validators.required,Validators.minLength(1)])//Sólo valida si hay algo en password
  });
  //Objeto que tomará el valor del formGroup
  user = {
    email:'',
    password:''
  }

  constructor(
    private userService:UserService, //Servicio donde se llama la APi para el usuario alkemy
    private router:Router,
  ) { }


  /*Función Para login Reactivo
    Esta función se ejecuta cuando el botón submit es presionado y toma el valor de lo que haya en
    los inputs, siempre y cuando sea valido
  */
  logIn(){
    this.user=this.contactForm.value; //Objeto toma el valor del grupo
    this.userService.signIn(this.user).subscribe(//Llamado a la API de usuarios

      (res:any)=>{    //Si hay un respuesta es porque fue validado exitosamente el usuario.
        localStorage.setItem('token',res.token);  //Se guarda el token recibido en el localStorage
        swal.fire({//Muestra una alerta de exito
          icon: 'success',
          title: 'Login success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['home']);//Redirige a la ruta HOME
      },
      error =>{ //Si el usuario/contraseña son incorrectos, se recibe una respuesta 404 de error, por lo tanto se captura aquí
        swal.fire({ //Muestra alerta de error
        icon: 'error',
        title: 'Error',
        text: 'Invalid user or password',
        showConfirmButton: false,
        timer: 1500});
      }
    );
  }
}
