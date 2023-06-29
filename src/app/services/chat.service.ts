import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat';
import { NewChat } from '../models/newChat';
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
    console.log("join room:", roomId);

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
    console.log("sendService");

  }

  receiveMessage(): Observable<string> {
    console.log("resiveService");

    return new Observable<string>((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message)
      })
    })
  }

  receiveRoomJoined(): void {
    this.socket.on('roomJoined', (roomId) => { console.log('Joined room:', roomId) })
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

  createGroupChat(userId: number, chat: NewChat): Observable<Chat> {
    return this.http.post<Chat>(this.baseApiUrl + 'Chat/' + userId, chat, httpOptions)
  }
  
  addUser(chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(this.baseApiUrl + 'Chat/AddUser', chat, httpOptions)
  }

  leaveChat(userId: number, chatId: number): Observable<Chat> {
    return this.http.put<Chat>(this.baseApiUrl + 'Chat/Leave/'+ userId + '/' + chatId, httpOptions)
  }

  updateChat(chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(this.baseApiUrl + 'Chat/Update', chat, httpOptions)
  }
}
