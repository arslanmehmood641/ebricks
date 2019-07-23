import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as M from 'materialize-css'
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  senderName: string;
  notifications: any;
  receiverName: any;
count=0;

  constructor(private router:Router,private userService:UserService,private acitvatedRoute:ActivatedRoute) { }

  ngOnInit() {
    var dropDownElement = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(dropDownElement,{
      alignment:'left',
      hover:true,
      coverTrigger:false,
      constrainWidth:false
    });
    this.senderName = sessionStorage.getItem('name');
    this.getUserData(this.senderName)
    this.acitvatedRoute.params.subscribe(name=>{
      this.receiverName=name.name;

  })
  }
logOut()
{
  sessionStorage.setItem("name", "")
  sessionStorage.setItem("id", "")
  this.router.navigate([""]);
}
getUserData(name)
{
  this.userService.GetUserByName(name).subscribe((data) => {
    this.notifications=data.user.notifications;
    this.count=this.notifications.length;
  });
}
getTime(time){
  return moment(time).fromNow();
}
getUserNamebyId(id)
{
 this.userService.GetUserById(id).subscribe(data=>{
   console.log(data)
 })
}

}
