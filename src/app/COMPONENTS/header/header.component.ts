import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectHeadloginService } from 'src/app/SERVICES/connect-headlogin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logOut:boolean = false;
  constructor(
    public connect: ConnectHeadloginService,
    private router: Router
    ) { }
  ngOnInit(): void {

  }

  logOutF(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
