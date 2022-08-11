import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string='https://triplemback.herokuapp.com/api';//Api propia para registrar usuario, email y contraseña Utilizada en pruebas
  urlAlk:string ='http://challenge-react.alkemy.org/';
  constructor(
    private http:HttpClient,
    private router:Router,
    private jwtHelper : JwtHelperService
    ) { }

  signInMine(user:User){//Función de prueba
    return this.http.post(`${this.url}/signin`,user);
  }

  signIn(user:User){
    return this.http.post(this.urlAlk,user);
  }

  isAuth():boolean{
  const token:any=localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem){
      return false;
    }
    return true;
  }
}

export interface User {
  name?:string,
  email?:string,
  pass?:string
}
