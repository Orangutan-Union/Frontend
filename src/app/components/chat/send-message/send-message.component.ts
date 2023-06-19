import { Component, Input, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Chat } from 'src/app/models/chat';
import { NewMessage } from 'src/app/models/newMessage';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  private socket: Socket;
  @Input() chat: Chat = new Chat;

  newMessage: string = '';
  message: NewMessage = new NewMessage;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
  }

  sendMessage() {
    this.message.userId = Number(localStorage.getItem('userid'));
    this.message.content = this.newMessage;
    this.message.chatId = this.chat.chatId;
    this.newMessage = this.newMessage + '|' + Number(localStorage.getItem('userid')); 

    this.chatService.sendMessage(this.chat.chatId, this.newMessage);
    
    this.chatService.createMessage(this.message).subscribe(message => { } );
    this.newMessage = '';
  }
}
