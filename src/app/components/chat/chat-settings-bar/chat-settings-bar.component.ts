import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, filter, Subject, Subscription, switchMap } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { LeavePopupComponent } from '../leave-popup/leave-popup.component';

@Component({
  selector: 'app-chat-settings-bar',
  templateUrl: './chat-settings-bar.component.html',
  styleUrls: ['./chat-settings-bar.component.css']
})
export class ChatSettingsBarComponent implements OnInit {
  @Output() clearSearch: EventEmitter<void> = new EventEmitter<void>();
  @Input() chat: Chat = new Chat;
  @Input() chatList: Chat[] = []
  private searchSubscription?: Subscription;
  private readonly searchSubject = new Subject<string | undefined>();
  searchUsers: User[] = [];
  search: string = '';
  chatLength: number = 0;
  newChatLength: number = 0;
  showAdd: boolean = false;
  showCancel: boolean = false
  userId: number = 0;
  popupBool: boolean = false

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.searchWithDelay();
  }

  ngOnChanges(): void {
    // Reset search when a new chat is selected
    this.resetSearch();
  }

  resetSearch() {
    this.search = '';
    this.searchUsers = [];
    this.cancelAddToChat();
  }

  getUserClass(user: User) {
    const classes = ['user'];

    this.chat.users.forEach(element => {
      if (element.userId == user.userId) {
        classes.push('selected')
      }
    });

    return classes;
  }

  openDialog(chat: Chat) {
    const dialogRef = this.dialog.open(LeavePopupComponent, {
      data: { chat: chat }
    });

    dialogRef.componentInstance.acceptClicked.subscribe(() => {
      this.leaveChat();
    });
  }

  leaveChat() {
    this.userId = Number(localStorage.getItem('userid'))
    var test = this.chatList.find(x => x.chatId == this.chat.chatId)

    if (test) {
      var index = this.chatList.indexOf(test)
      this.chatList.splice(index, 1)
    }

    this.chatService.leaveChat(this.userId, this.chat.chatId).subscribe(chat => { })
  }

  onSearchQueryInput(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    if (searchQuery.trim().length > 1) {
      this.search = searchQuery;
      this.searchSubject.next(searchQuery?.trim());
    }
    else if (searchQuery.trim().length <= 1) {
      this.searchUsers = [];
      this.search = '';
    }
  }

  searchWithDelay(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500), // Miliseconds after last input before searching starts
        switchMap(term => this.authService.getUsersBySearch(term!.trim()))
      )
      .subscribe(res => {
        if (this.search !== '') { // If statement prevents results from not matching query which could happen if you used backspace fast
          this.searchUsers = res.slice(0, 4);
        }
      })
  }

  addToChat(user: User) {
    if (this.chat.users.filter(x => x.userId == user.userId).length == 0) {
      this.chat.users.push(user);
    }
    else {
      this.chat.users.splice(this.chat.users.indexOf(user), 1)
    }
    this.chatLength = Number(localStorage.getItem('chatLength'))
    this.newChatLength = this.chat.users.length
    this.showCancel = true;

    console.log(this.chat.users);
    

    this.showAddButton();
  }

  cancelAddToChat() {
    this.chat.users = this.chat.users.slice(0, this.chatLength);
    this.newChatLength = this.chat.users.length
    this.showCancel = false;

    this.showAddButton();
  }

  showAddButton() {
    if (this.chatLength == this.newChatLength) {

      this.showAdd = false;
    }
    else {
      this.showAdd = true
    }
  }

  saveChat() {
    this.chatService.addUser(this.chat).subscribe(chat => {
      console.log(chat);
    })
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.showAdd = false;
  }

  getMessageClasses(user: User) {
    const classes = ['user'];

    if (this.chat.users.filter(x => x.userId == user.userId).length != 0) {
      classes.push('selected');
    }

    return classes;
  }
}
