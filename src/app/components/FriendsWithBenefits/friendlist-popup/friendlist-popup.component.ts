import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FriendFollower } from 'src/app/models/friendfollower';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-friendlist-popup',
  templateUrl: './friendlist-popup.component.html',
  styleUrls: ['./friendlist-popup.component.css']
})
export class FriendlistPopupComponent implements OnInit {
  @ViewChild('myId',{read: ElementRef}) private myScrollContainer: ElementRef;
  friends: User[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: Router) {
    this.friends = data.friends;
  }

  ngOnInit(): void {
   
  }

  ngAfterViewChecked():void{
    // this.myScrollContainer.nativeElement.scrollTop = 0
  }

  navigate(id: number){
    this.route.navigate(['/visitingProfil/',id]);
  }

}
