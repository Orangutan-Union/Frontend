import { Component, OnInit, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { ChatSelectComponent } from '../chat-select/chat-select.component';
import { Unsub } from 'src/app/classes/unsub';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent extends Unsub implements OnInit {
  @Input() chat: Chat = new Chat;
  @Input() chatList: Chat[] = [];

  messageList: string[] = [];
  userId: number = 0;
  loggedInUser: number = 0;

  constructor(private chatService: ChatService, private chatSelect: ChatSelectComponent) { super(); }

  ngOnInit(): void {
    this.loggedInUser = Number(localStorage.getItem('userid'))

    this.chatService.receiveMessage().pipe(takeUntil(this.unsubscribe$)).subscribe((message: string) => {     
      var messageSplit = message.split('|')
      
      this.chat.users.forEach(user => {
        if (user.userId == Number(messageSplit[1])) {
          const newMessage = new Message();
          newMessage.content = messageSplit[0];
          newMessage.user = user;
          
          newMessage.user.picture = user.picture;
          this.chat.messages.push(newMessage);
        }
      });
      window.scroll(0, document.documentElement.scrollHeight)
    });
  }

  ngOnChanges(): void {
  }

  getMessageClasses(message: Message, index: number) {
    const classes = [message.user.userId == this.loggedInUser ? 'usersMessages' : 'othersMessages'];

    const isFirstMessage = index === 0;
    const isLastMessage = index === this.chat.messages.length - 1;
    const isFirstDifferentUser = !isFirstMessage && this.chat.messages[index - 1].user.userId !== message.user.userId;
    const isLastDifferentUser = !isLastMessage && this.chat.messages[index + 1].user.userId !== message.user.userId;

    if ((isFirstMessage && isLastDifferentUser) || (isLastMessage && isFirstDifferentUser)
      || (isFirstDifferentUser && isLastDifferentUser) || (isFirstMessage && isLastMessage)) {
      classes.push('onlyMessage');
    } else if (isFirstMessage || isFirstDifferentUser) {
      classes.push('firstMessage');
    } else if (isLastMessage || isLastDifferentUser) {
      classes.push('lastMessage');
    } else if (isFirstDifferentUser || isLastDifferentUser) {
      classes.push('middleMessage');
    }
  
    return classes;
  }
}
