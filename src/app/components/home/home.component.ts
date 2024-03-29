import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/models/changepassword';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FriendrequestService } from 'src/app/services/friendrequest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  FriendsBoolean: Boolean = false;
  FollowerBoolean: Boolean = false;

  tt: ChangePassword = new ChangePassword;
  user: User = new User;
  userId: number = 0;
  formData = new FormData();
  constructor(private authService: AuthService, private route: Router, private frService: FriendrequestService) { }

  ngOnInit(): void {   
   let FriendsBoolean = localStorage.getItem('FriendBoolean')
   let FollowerBoolean = localStorage.getItem('FollowerBoolean')
   this.FollowerBoolean = JSON.parse(FollowerBoolean!)
   this.FriendsBoolean = JSON.parse(FriendsBoolean!)
   this.getUser();
}

  getUser(){
    this.authService.getUserById(Number(localStorage.getItem('userid'))).subscribe(res => {
      this.user = res;
      //If there are any received friendrequests pending then show the notification indicator
      if (this.user.receivedFriendRequests.length > 0) {
        this.frService.updateNotificationDot(true);
      }      
    });
  }
  
  FriendsFeed(){
    this.FriendsBoolean = !this.FriendsBoolean
    localStorage.setItem('FriendBoolean', this.FriendsBoolean.toString());
  }
  FollowerFeed(){
    this.FollowerBoolean = !this.FollowerBoolean
    localStorage.setItem('FollowerBoolean', this.FollowerBoolean.toString())
  }
}
