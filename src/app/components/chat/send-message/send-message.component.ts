import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Unsub } from 'src/app/classes/unsub';
import { Chat } from 'src/app/models/chat';
import { NewMessage } from 'src/app/models/newMessage';
import { ChatService } from 'src/app/services/chat.service';
import { FriendfollowerService } from 'src/app/services/friendfollower.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent extends Unsub implements OnInit {
  @Input() inChat: Chat = new Chat;
  @Input() chatList: Chat[] = [];
  private socket: Socket;
  chat: Chat = new Chat;
  index: number = 0;
  blocking: boolean = false;


  newMessage: string = '';
  message: NewMessage = new NewMessage;

  constructor(private chatService: ChatService, private friendFollower: FriendfollowerService) { super(); }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');    
    this.PressEnter()
  }

  ngOnChanges(): void {
    this.getBlockedChats();    
  }

  PressEnter(): void{
    var input = document.getElementById("content")

    input?.addEventListener("keypress", e =>{
      if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        if(this.newMessage.trim() !== ''){
        this.sendMessage();
      }
      }
    })
  }


  getBlockedChats() {
    this.friendFollower.getBlockUserChat(this.inChat.users[0].userId, this.inChat.users[1].userId).pipe(takeUntil(this.unsubscribe$))
    .subscribe(blocking => {
      if (blocking != null && this.inChat.isPrivate == true)
      {
        this.blocking = true
      }
      else
      {
        this.blocking = false        
      }      
    });
  }

  sendMessage() {
    this.message.userId = Number(localStorage.getItem('userid'));
    this.message.content = this.newMessage;
    this.message.chatId = this.inChat.chatId;
    this.newMessage = this.newMessage + '|' + Number(localStorage.getItem('userid'));

    this.chatService.sendMessage(this.inChat.chatId, this.newMessage);

    this.chatService.createMessage(this.message).pipe(takeUntil(this.unsubscribe$)).subscribe(message => {

      this.chatList.forEach(chat => {
        if (chat.chatId == this.inChat.chatId) { 
          this.chat = this.chatList[this.index]
          this.chat.lastMessageSent = message.timeStamp
          this.chatList.splice(this.index, 1)
        }
        this.index++
      });
      this.index = 0;

      this.chatList.unshift(this.chat);
    });
    this.newMessage = '';
  }
}
