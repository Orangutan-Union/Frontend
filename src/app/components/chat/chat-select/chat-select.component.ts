import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-select',
  templateUrl: './chat-select.component.html',
  styleUrls: ['./chat-select.component.css']
})
export class ChatSelectComponent implements OnInit {
  @Output() selectedChat: EventEmitter<Chat> = new EventEmitter<Chat>();
  @Output() chatList: EventEmitter<Chat[]> = new EventEmitter<Chat[]>();
  chats: Chat[] = [];
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
}