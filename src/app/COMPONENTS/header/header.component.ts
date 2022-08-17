import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectHeadloginService } from 'src/app/SERVICES/connect-headlogin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logOut:boolean = this.connect.logoutView; // Variable que marca la pauta para saber si mostrar el boton de Logout

  constructor(
    public connect: ConnectHeadloginService,
    private router: Router,
    ) { }
  ngOnInit(): void {
    localStorage.removeItem('token'); // al iniciar el codigo en login se borra automáticamente el token de localstorage
  }

  /*
    Si el botón logout es presionado, se borra el token y se redirecciona a la ruta Login.
  */
  logOutF(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
