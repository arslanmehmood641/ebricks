import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import io from 'socket.io-client'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
 receiverName;
 senderName;
 senderId;
 receiverId;
 receiver;
 msg;
 msgArray;
 socket:any;
 data;
  constructor(private userService:UserService ,private acitvatedRoute:ActivatedRoute,private messageService:MessageService) {
    this.socket=io('http://localhost:3000')
  }
  ngOnInit() {
    this.senderName=sessionStorage.getItem("name")
    console.log(this.senderName)
    this.senderId=sessionStorage.getItem("id")
    this.acitvatedRoute.params.subscribe(name=>{
        this.receiverName=name.name;

        this.getUserByName(name);
       // console.log("refreshAbove");
        this.socket.on('refreshPage',()=>{
          console.log("refresh");
          this.getUserByName(name);
        })
        this.socket.on('dataReceived',(data)=>{
          this.data=data.data.data

        })
    })
  }
 async getUserByName(name)
  {
    console.log(name.name);
    this.userService.GetUserByName(this.receiverName).subscribe(data1=>{
      this.receiver=data1;
      this.receiverId=this.receiver.user._id
      this.getMessages(this.senderId,this.receiver.user._id)
    })
  }
  sendMessage(form:NgForm)
  {
    this.msg=form.value.message;
    let data=form.value.message;
    this.socket.emit('data',{data})
    this.messageService.saveMessage(this.senderId,this.receiver.user._id,this.senderName,this.receiverName,this.msg)
    .subscribe(data=>{
       console.log(data);
       form.resetForm()
       this.socket.emit('refresh',{})
    })
  }
 getMessages(senderId1,receiverId){
    this.messageService.getMessage(senderId1,receiverId)
    .subscribe(data=>{
      this.msgArray=data;
      this.msgArray=Object.entries(this.msgArray)
      this.msgArray=this.msgArray[1][1]
    })

  }

}
