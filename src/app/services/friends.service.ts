import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http:HttpClient) { }
  followUser(myId,friendId):Observable<any>{
    console.log("hello")
    return this.http.post('http://localhost:3000/api/folow',{
      myId,
      friendId
    })
  }
}
