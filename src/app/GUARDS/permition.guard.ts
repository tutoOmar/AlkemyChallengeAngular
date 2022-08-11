import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectHeadloginService } from '../SERVICES/connect-headlogin.service';
import { UserService } from '../SERVICES/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermitionGuard implements CanActivate {

  constructor(
    private userService:UserService,
    private router:Router,
    private connect: ConnectHeadloginService){}

  canActivate():boolean{

    if(!this.userService.isAuth()){
      console.log('Token Expirado');
      this.router.navigate(['login']);
      return false;
    }
    this.connect.logoutView=true;
    return true;
  }

}
