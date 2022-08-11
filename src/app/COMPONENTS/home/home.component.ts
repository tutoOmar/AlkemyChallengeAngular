import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/SERVICES/api.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService : ApiService) { }
  menu !: any;
  ngOnInit(): void {
    this.apiService.getMenu().
    pipe(
      tap(res=>{
      this.menu =res;

    })
    ).subscribe();
  }

}

export interface menu {
  results:{
    id:number,
    title:'',
    image:''
  }
};
