import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  selectedChat: Chat;
  chatList: Chat[];

  onChatSelected(chat: Chat) {
    this.selectedChat = chat;
  }

  onChatList(chat: Chat[]) {
    this.chatList = chat;
  }

  constructor() { }

  ngOnInit() {    
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
}

