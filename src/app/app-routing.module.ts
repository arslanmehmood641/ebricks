import { AuthTabsComponent } from "./components/auth-tabs/auth-tabs.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QueueComponent } from './components/queue/queue.component';
import { PeopleComponent } from './components/people/people.component';
import { ChatComponent } from './components/chat/chat.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingsComponent } from './components/followings/followings.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  { path: "", component: AuthTabsComponent },
  { path: "queue", component: QueueComponent },
  {path:"people",component:PeopleComponent},
  {path:"chat/:name",component:ChatComponent},
  {path:"followers",component:FollowersComponent},
  {path:"followings",component:FollowingsComponent},
  {path:"notifications",component:NotificationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
