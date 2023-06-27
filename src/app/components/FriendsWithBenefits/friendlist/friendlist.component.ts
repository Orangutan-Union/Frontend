import { Component, OnInit } from '@angular/core';
import { FriendFollower } from 'src/app/models/friendfollower';
import { FriendfollowerService } from 'src/app/services/friendfollower.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {

  friends: FriendFollower[] = [];
  constructor(private ffService: FriendfollowerService) { }

  ngOnInit(): void {
    this.getUserFriends();
  }

  getUserFriends(){
    let userId = Number(localStorage.getItem('userid'));
    this.ffService.getUserFriends(userId).subscribe(res => {
      this.friends = res;
      console.log(this.friends);
    });
  }

}
