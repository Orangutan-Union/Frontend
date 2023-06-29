import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-leave-popup',
  templateUrl: './leave-popup.component.html',
  styleUrls: ['./leave-popup.component.css']
})
export class LeavePopupComponent implements OnInit {
chat: Chat = new Chat;
@Output() acceptClicked: EventEmitter<void> = new EventEmitter<void>();
userId: number = 0;
  constructor(
    private chatService: ChatService,
    public dialogRef: MatDialogRef<LeavePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { this.chat = data.chat }

  ngOnInit(): void {
  } 

  onAcceptClick() {
    this.acceptClicked.emit();
  }
}
