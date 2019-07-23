import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }
  saveMessage(senderId="5d2dd440357495137de3fdd0",receiverId="5d2da2e4adcc310cda805940",senderName="mughal",receiverName="shahbaz",message):Observable<any>
  {
    return this.http.post('http://localhost:3000/api/savemessage',{
      senderId,
      receiverId,
      senderName,
      receiverName,
      message
    })
  }
  getMessage(senderId,recieverId):Observable<any>
  {
    let params = new HttpParams();
    params = params.append('senderId', senderId);
    params = params.append('receiverId', recieverId);
    return this.http.get('http://localhost:3000/api/getmessages',{
      params:params
    })
  }
}
