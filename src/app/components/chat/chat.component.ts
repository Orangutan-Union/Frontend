import { Component, OnInit } from '@angular/core';
import { EMPTY, empty, isEmpty } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { NewMessage } from 'src/app/models/newMessage';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat: Chat = new Chat;
  chatList: Chat[] = [];
  newMessage: string = '';
  message: NewMessage = new NewMessage;
  messageList: string[] = [];
  userId: number = 0;
  loggedInUser: number = 0;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.loggedInUser = Number(localStorage.getItem('userid'))
    this.chatService.getUserChats(Number(localStorage.getItem('userid'))).subscribe(chats => {
      console.log(chats);

      this.chatList = chats;
    })
    this.chatService.getNewMessage().subscribe((message: string) => {      
      var messageSplit = message.split('|')
      
      this.chat.users.forEach(user => {           
        if (user.userId == Number(messageSplit[1])) {
          const newMessage = new Message();
          newMessage.content = messageSplit[0];
          newMessage.user = user;
          console.log(newMessage.user);
          
          newMessage.user.picture = user.picture;
          this.chat.messages.push(newMessage);
        }
      });
    })
  }

  selectChat(id : number) {
    this.chatService.getChatOnId(id).subscribe(chat => {
      console.log(chat);
      
      this.chat = chat
      this.chat.messages
    })
  }

  sendMessage() {
    this.message.userId = Number(localStorage.getItem('userid'));
    this.message.content = this.newMessage;
    this.message.chatId = this.chat.chatId;
    this.chatService.createMessage(this.message).subscribe(message => {})
    this.newMessage = this.newMessage + '|' + Number(localStorage.getItem('userid'))
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }  
}
