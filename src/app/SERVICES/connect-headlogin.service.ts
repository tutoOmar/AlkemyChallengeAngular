import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectHeadloginService {

  //Service utilizado únicamente para activar la bandera de logout para poder visualizarlo en el HOME y no el Login
  //Este service se conecta con el HEADER y con Permition.guard
  logoutView:boolean=false;
  constructor() { }

}
