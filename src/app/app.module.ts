import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthTabsComponent } from './components/auth-tabs/auth-tabs.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {UserService} from './services/user.service';
import { QueueComponent } from './components/queue/queue.component';
import { PeopleComponent } from './components/people/people.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component'
import { MessageService } from './services/message.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FriendsService } from './services/friends.service';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingsComponent } from './components/followings/followings.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthTabsComponent,
    SigninComponent,
    SignupComponent,
    QueueComponent,
    PeopleComponent,
    NavbarComponent,
    ChatComponent,
    MessageComponent,
    SidebarComponent,
    FollowersComponent,
    FollowingsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule
  ],
  providers: [UserService,MessageService,FriendsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
