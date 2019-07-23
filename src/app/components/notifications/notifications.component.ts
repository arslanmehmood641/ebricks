import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client'
import * as moment from 'moment'
@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: [ './notifications.component.css' ]
})
export class NotificationsComponent implements OnInit {
	senderName: string;
  userArray;
  socket:any;
  notifications: any;
	constructor(private userService: UserService) {
    this.socket=io('http://localhost:3000')
  }

	ngOnInit() {
		this.senderName = sessionStorage.getItem('name');
	    this.getUserData(this.senderName)
    this.socket.on('refreshPage',()=>{
      console.log("refresh");
      this.getUserData(this.senderName);
    })
  }
  getUserData(name)
  {
    this.userService.GetUserByName(name).subscribe((data) => {
			this.notifications=data.user.notifications;
    });
  }
  getTime(time){
    return moment(time).fromNow();
  }
}
