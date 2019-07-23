import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service'
import { Router } from "@angular/router";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public userService:UserService,private router:Router) { }

  ngOnInit() {
  }
  AddUser(form:NgForm)
  {

    this.userService.addUser(form.value.username,form.value.password,form.value.email).subscribe(res=>{
      console.log(res);
      this.router.navigate([""])
    })

    form.resetForm();
  }

}
