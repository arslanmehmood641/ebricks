import { Component, OnInit,Input } from '@angular/core';
import {UserService} from '../../services/user.service'
import { User } from 'src/app/models/user.model';
import { FriendsService } from 'src/app/services/friends.service';
import * as _ from 'lodash';
import io from 'socket.io-client'
import { Router } from "@angular/router";
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  socket:any;

   @Input()users=[];
  constructor(private userService:UserService,private friendService:FriendsService,private router:Router) {
    this.socket=io('http://localhost:3000')
   }
name;
userId;
flag=false;
  ngOnInit() {
    console.log(sessionStorage.getItem("id"))
    console.log(sessionStorage.getItem("name"))

    this.userId=sessionStorage.getItem("id");
    this.name=sessionStorage.getItem("name")
    this.userService.getUser()
     this.userService.getUserUpdatedListener()
     .subscribe((users:User[])=>{
      //console.log(users);
      this.users=users;
      this.userId=sessionStorage.getItem("id");
    });
    this.socket.on('refreshPage',()=>{
      //this.userService.getUser()
      console.log("refresh");
      this.userService.getUser()
      this.userService.getUserUpdatedListener()
      .subscribe((users:User[])=>{
       //console.log(users);
       this.users=users;

     });
    })
  }
  followUser(friendId,friendName){


    this.userService.startFollowing(this.userId,this.name,friendId,friendName)
    .subscribe(data=>{
      console.log(data);
      this.socket.emit('refresh',{})
    })
  }
  checkIfAlreadyFollowed(arr){
  let test=false;

    arr.forEach(element1 => {
    if(element1.follower===this.userId){
      test=true;
    }


    });
    //console.log(test)
    return test;
  }

}
