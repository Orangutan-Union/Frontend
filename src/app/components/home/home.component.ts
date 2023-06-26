import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/models/changepassword';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
   //this.getUser();
  }
  FriendsFeed(){
    this.FriendsBoolean = !this.FriendsBoolean
    console.log("FriendFeed    :" + this.FriendsBoolean);
    
  }
  FollowerFeed(){
    this.FollowerBoolean = !this.FollowerBoolean
    console.log("FollowerFeed    :" + this.FollowerBoolean);
    
  }
}
