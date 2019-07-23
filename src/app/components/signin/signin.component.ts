import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errormessage;
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() {
  }
  Validate(form:NgForm)
  {
    this.userService.SignIn(form.value.username,form.value.password).subscribe(data=>{
    //console.log(data.users._id);
    if(data.users)
    {
      console.log(form.value.username);

    sessionStorage.setItem("name", form.value.username);
    sessionStorage.setItem("id", null);
    sessionStorage.setItem("id", data.users._id);
    this.router.navigate(["people"])
    }
    else{
      this.errormessage="username or password may be in crorrrect"
    }


  })

  }

}

