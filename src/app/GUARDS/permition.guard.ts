import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ConnectHeadloginService } from '../SERVICES/connect-headlogin.service';
import { UserService } from '../SERVICES/user.service';


@Injectable({
  providedIn: 'root'
})
export class PermitionGuard implements CanActivate {

  constructor(
    private userService:UserService,
    private router:Router,
    private connect: ConnectHeadloginService
    ){}

    //Guard se activa mendiante CAN Activate
  canActivate():boolean{

    if(!this.userService.isAuth()){ //Con la funcion del service user.service, recibe un true si el token es valido y false si ya expiró o está vacio
      console.log('Token Expirado');
      this.router.navigate(['login']); //Redirecciona al login
      return false;
    }
    this.connect.logoutView=true;//Activa la bandera de logout, y permite que al estar el HOME se vea el botón de LOGOUT
    return true;
  }

}
