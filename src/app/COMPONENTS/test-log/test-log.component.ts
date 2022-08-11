import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';

import swal from'sweetalert2';

@Component({
  selector: 'app-test-log',
  templateUrl: './test-log.component.html',
  styleUrls: ['./test-log.component.css']
})
export class TestLogComponent implements OnInit {
  contactForm= new FormGroup({
    email : new FormControl('',[Validators.required,Validators.minLength(1),Validators.email]),
    pass : new FormControl('',[Validators.required,Validators.minLength(1)])
  });
  titleAlert : string='';

  user = {
    email:'',
    pass:''
  }
  constructor() { }

  ngOnInit(): void {

  }


  send(){
    console.warn(this.contactForm.value);
    this.user = this.contactForm.value;
    swal.fire('Good job!',
    'You clicked the button!',
    'success')

  }
}
