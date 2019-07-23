import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  name;
users:[];
id;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.name=sessionStorage.getItem("name")
    this.id=sessionStorage.getItem("id")
    this.getUserByName(this.name)

  }
  getUserByName(name)
  {

    this.userService.GetUserByName(name).subscribe(data1=>{
     console.log(data1)
      this.users=data1.user.followers;

      //this.users=data1.followings;
      console.log(this.users)
    })
  }

}
