import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import {User} from "../models/user.model";

import {Subject, Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:User[]=[];
  private userUpdated=new Subject<User[]>();
  constructor(private http:HttpClient) { }
addUser(username:string,password:string,email:string)
{
  const user:User={_id:null,username:username,password:password,email:email}
  return this.http.post('http://localhost:3000/api/user',user);

}
getUser(){
  this.http.get<{message:string,users:User[]}>("http://localhost:3000/api/users").
  subscribe((userData)=>{
  this.users=userData.users;
  this.userUpdated.next([...this.users]);
  })
 }
 getUserUpdatedListener()
 {
   return this.userUpdated.asObservable();
 }
 GetUserById(id): Observable<any>{
   console.log("reac")
  let params = new HttpParams();
  params = params.append('id',id);
   return this.http.get('http://localhost:3000/api/userbyId',{params:params})
 }
 SignIn(username,password):Observable<any>
{

  let params = new HttpParams();
  params = params.append('username',username);
  params = params.append('password', password);
  return this.http.get('http://localhost:3000/api/userbyname1',{params:params})

}
 GetUserByName(username): Observable<any>{
  let params = new HttpParams();
  params = params.append('username',username);

  return this.http.get('http://localhost:3000/api/userbyname',{params:params})
}

startFollowing(myId,myName,friendId,friendName): Observable<any>{
  return this.http.post('http://localhost:3000/api/followUser',{
    myId,
    myName,
    friendId,
    friendName
  })

}
stopFollowing(user): Observable<any>{

  return this.http.get('http://localhost:3000/api/unfollow-user')

}

}
