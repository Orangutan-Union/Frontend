import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { NewChat } from 'src/app/models/newChat';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('MyDiv', { read: ElementRef }) private scrollBar: ElementRef
  selectedChat: Chat;
  chatList: Chat[];
  chats: Chat[];

  
  @Output() createChatBool: boolean = false;



  onChatSelected(chat: Chat) {
    this.selectedChat = chat;
  }

  onChatList(chat: Chat[]) {
    this.chatList = chat;
  }

  onMessageSend(chat: Chat[]) {
    this.chatList = chat;   
  }
  
  constructor() { }

  ngOnChanges(): void{

  }
  
  ngAfterViewChecked(): void{
    
    this.scrollBar.nativeElement.scrollTop = this.scrollBar.nativeElement.scrollHeight; 
  }

  ngOnInit() { 
  }

  createChatBoolChange() {
    this.createChatBool = !this.createChatBool
    this.scrollBar.nativeElement.scrollTop = this.scrollBar.nativeElement.scrollHeight; 
  }
}

