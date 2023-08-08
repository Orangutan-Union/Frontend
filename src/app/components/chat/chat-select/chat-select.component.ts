import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, } from '@angular/core';
import { Unsub } from 'src/app/classes/unsub';
import { Chat } from 'src/app/models/chat';
import { NewChat } from 'src/app/models/newChat';
import { ChatService } from 'src/app/services/chat.service';
import { takeUntil } from 'rxjs/operators'
import { registerLocaleData } from '@angular/common';
import localeDk from '@angular/common/locales/en-DK';
registerLocaleData(localeDk, 'dk');

@Component({
  selector: 'app-chat-select',
  templateUrl: './chat-select.component.html',
  styleUrls: ['./chat-select.component.css']
})
export class ChatSelectComponent extends Unsub implements OnInit {
  @Output() selectedChat: EventEmitter<Chat> = new EventEmitter<Chat>();
  @Output() chatList: EventEmitter<Chat[]> = new EventEmitter<Chat[]>();
  @Input()  createChatBool: boolean
  // @Input() inChats: Chat[] = [];
  userId: number = 0;
  chats: Chat[] = [];
  newChat: NewChat = new NewChat;
  selectedChatId: number | null = null;
  userIdChecker: number = 0;
  currentDate: Date = new Date()
  time: string
  dummyId: number;
  dummyChat: Chat

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) { super(); }

  ngOnInit(): void {
    this.getUserChats();
    this.userIdChecker = Number(localStorage.getItem('userid'))
    this.time = this.changeDateYYMMDD(this.currentDate.getTime())
  }

  changeDateYYMMDD(date: any) {
    let newDate = new Date(date);
    let convertDate = `${
      newDate.getMonth() + 1
    }/${newDate.getDate()}/${newDate.getFullYear()}`;
  
    return convertDate;
  }

  getUserChats() {
    this.chatService.getUserChats(Number(localStorage.getItem('userid'))).pipe(takeUntil(this.unsubscribe$)).subscribe(chats => {
      this.chats = chats;      
      this.selectChat(chats[0].chatId)
      this.chatList.emit(chats);   
          console.log("NEJTAK");
          
    // this.chatService.LastMessageEvent.subscribe(data =>{
    //   this.chats.forEach(e => {
    //     if(e.chatId === this.dummyId){
    //       e.lastMessageSent = data
    //     }
    //   });
    // }) 
    // this.chatService.LastMessageEventID.subscribe(data =>{
    //   this.dummyId = data
    // })

      // console.log(chats);    
    });

  }


  
 

  selectChat(id: number) {
    this.chatService.getChatOnId(id).pipe(takeUntil(this.unsubscribe$)).subscribe(chat => {
      const chatId = chat.chatId;
      this.joinRoom(chatId);
      this.selectedChatId = chatId;
      this.selectedChat.emit(chat);
      localStorage.setItem('chatLength', chat.users.length.toString());      
    });
  }

  joinRoom(roomId: number) {
    this.chatService.joinRoom(roomId);
  }

  leaveRoom(roomId: number) {
    this.chatService.leaveRoom(roomId);
  }

  createChatBoolChange() {
    this.createChatBool = !this.createChatBool
  }

  createChat() {
    this.userId = Number(localStorage.getItem('userid'));
    this.chatService.createGroupChat(this.userId, this.newChat).subscribe(chat => {
      this.newChat.chatName = '';
      this.createChatBoolChange();
      this.updateChatList(chat);
    })
  }

  updateChatList(chat: Chat) {
    this.chats.unshift(chat)
  }
}