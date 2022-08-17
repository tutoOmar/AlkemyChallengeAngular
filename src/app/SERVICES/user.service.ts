import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; //libreria para poder verificar si el token es valido

@Injectable({
  providedIn: 'root'
})
export class UserService {


  urlAlk:string ='http://challenge-react.alkemy.org/';//Url alkemy para ingresar usuario y contraseña,
                                                  //En este caso lo único que puede ser recibido es
                                                  //email:challenge@alkemy.org y password:react
  constructor(
    private http:HttpClient,
    private router:Router,
    private jwtHelper : JwtHelperService
    ) { }

  //llamado a la API mediante el método POST, pero no POSTEA nada
  signIn(user:User){
    return this.http.post(this.urlAlk,user);
  }

  //Función utlizada en el guard para poder activar rutas
  isAuth():boolean{
  const token:any=localStorage.getItem('token'); //Se obtiene del localStorage el token
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem){  // Se pregunta si no hay expirado y que haya algún item
      return false;
    }
    return true;
  }
}

//Tipo de dato recibido del LOGIN y será enviado a la API.
export interface User {

  email?:string,
  pass?:string
}
