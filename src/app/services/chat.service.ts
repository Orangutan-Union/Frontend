import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
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
  private socket: Socket;
  
  constructor(private http: HttpClient, private route: Router) { 
    this.socket = io('http://localhost:3000');
  }   

  joinRoom(roomId: number): void {
    this.socket.emit('joinRoom', roomId);
  }
  
  leaveRoom(roomId: number): void {
    this.socket.emit('leaveRoom', roomId);
  }

  sendMessage(roomId: number, message: string): void {
    const messageData = {
      roomId,
      content: message
    };
    this.socket.emit('message', messageData)
  }

  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message)
      })
    })
  }

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