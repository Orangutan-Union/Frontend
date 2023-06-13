import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat';
import { NewMessage } from '../models/newMessage';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseApiUrl: string = environment.baseApiUrl;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  
  constructor(private http: HttpClient, private route: Router) { }


  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

  getUserChats(id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseApiUrl + 'Chat/User/' + id);
  }

  getChatOnId(id: number): Observable<Chat> {
    return this.http.get<Chat>(this.baseApiUrl + 'Chat/' + id);
  }

  createMessage(message: NewMessage): Observable<NewMessage> {
    return this.http.post<NewMessage>(this.baseApiUrl + 'Message', message, httpOptions);
  }
}
