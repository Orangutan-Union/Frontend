import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { NewChat } from 'src/app/models/newChat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-select',
  templateUrl: './chat-select.component.html',
  styleUrls: ['./chat-select.component.css']
})
export class ChatSelectComponent implements OnInit {
  @Output() selectedChat: EventEmitter<Chat> = new EventEmitter<Chat>();
  @Output() chatList: EventEmitter<Chat[]> = new EventEmitter<Chat[]>();
  userId: number = 0;
  chats: Chat[] = [];
  newChat: NewChat = new NewChat;
  createChatBool: boolean = false;
  selectedChatId: number | null = null;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getUserChats();
  }

  getUserChats() {
    this.chatService.getUserChats(Number(localStorage.getItem('userid'))).subscribe(chats => {
      this.chats = chats;
      this.chatList.emit(chats);
    });
  }

  selectChat(id: number) {
    this.chatService.getChatOnId(id).subscribe(chat => {
      const chatId = chat.chatId;
      this.joinRoom(chatId);
      this.selectedChatId = chatId;
      this.selectedChat.emit(chat);
    });
  }

  joinRoom(roomId: number) {
    this.chatService.joinRoom(roomId);
  }

  leaveRoom(roomId: number) {
    this.chatService.leaveRoom(roomId);
  }

  createChatBoolChange() {
    console.log(this.createChatBool);
    this.createChatBool = !this.createChatBool
    console.log(this.createChatBool);
  }

  createChat() {
    this.userId = Number(localStorage.getItem('userid'));
    this.chatService.createGroupChat(this.userId, this.newChat).subscribe(chat => {
      console.log(chat);
      console.log(this.chats);
      this.chats.unshift(chat)
      console.log(this.chats);
      this.newChat.chatName = '';
    })

  }
}