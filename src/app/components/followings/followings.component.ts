import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.css']
})
export class FollowingsComponent implements OnInit {
name;
users:[];
id;
  constructor(private userService:UserService) {
    this.users=null;
   }

  ngOnInit() {
    this.name=sessionStorage.getItem("name")
    this.id=sessionStorage.getItem("id")
    this.getUserByName(this.name)
  }
   getUserByName(name)
  {

    this.userService.GetUserByName(name).subscribe(data1=>{
     console.log(data1)
      this.users=data1.user.followings;

      //this.users=data1.followings;
      console.log(this.users)
    })
  }

}
