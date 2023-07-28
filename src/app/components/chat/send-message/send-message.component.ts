import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Unsub } from 'src/app/classes/unsub';
import { Chat } from 'src/app/models/chat';
import { NewMessage } from 'src/app/models/newMessage';
import { ChatService } from 'src/app/services/chat.service';
import { ChatSelectComponent } from '../chat-select/chat-select.component';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent extends Unsub implements OnInit {
  @Output() chats: EventEmitter<Chat[]> = new EventEmitter<Chat[]>();
  @Input() inChat: Chat = new Chat;
  @Input() chatList: Chat[] = [];
  private socket: Socket;
  chat: Chat = new Chat;
  index: number = 0;
  

  newMessage: string = '';
  message: NewMessage = new NewMessage;

  constructor(private chatService: ChatService, private chatSelect: ChatSelectComponent) { super(); }

  ngOnInit(): void {
    this.socket = io('http://192.168.20.33:83');
  }

  sendMessage() {
    this.message.userId = Number(localStorage.getItem('userid'));
    this.message.content = this.newMessage;
    this.message.chatId = this.inChat.chatId;
    this.newMessage = this.newMessage + '|' + Number(localStorage.getItem('userid'));

    this.chatService.sendMessage(this.inChat.chatId, this.newMessage);

    this.chatService.createMessage(this.message).pipe(takeUntil(this.unsubscribe$)).subscribe(message => {

      this.chatList.forEach(chat => {
        if (chat.chatId == this.inChat.chatId)
        {
          this.chat = this.chatList[this.index]
          this.chatList.splice(this.index, 1)
        }
        this.index++
      });
      this.index = 0;

      this.chatList.unshift(this.chat);
      this.chats.emit(this.chatList);
    });
    this.newMessage = '';
  }
}
