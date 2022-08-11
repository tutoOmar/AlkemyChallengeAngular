import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/SERVICES/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menu!:object;
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.apiService.getMenu().subscribe(res=>{
      this.menu =res;
      console.log(this.menu);
    });
  }

}
