import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AddmenuService } from 'src/app/SERVICES/addmenu.service';

import swal from'sweetalert2';

@Component({
  selector: 'app-test-log',
  templateUrl: './test-log.component.html',
  styleUrls: ['./test-log.component.css']
})
export class TestLogComponent implements OnInit {
  quantity$ = this.addMenu.quantityAction$;
  total$=this.addMenu.totalAction$;
  menu$ = this.addMenu.menuAction$;
  constructor(private addMenu: AddmenuService,private router:Router) { }
  ngOnInit(): void {

  }
}
