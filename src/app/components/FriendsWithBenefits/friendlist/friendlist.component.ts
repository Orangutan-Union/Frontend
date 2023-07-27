import { Component, Input, OnInit } from '@angular/core';
import { Unsub } from 'src/app/classes/unsub';
import { FriendFollower } from 'src/app/models/friendfollower';
import { FriendfollowerService } from 'src/app/services/friendfollower.service';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent extends Unsub implements OnInit {
  friends: FriendFollower[] = [];
  constructor(private ffService: FriendfollowerService) { super(); }

  ngOnInit(): void {
    this.getUserFriends();
  }

  getUserFriends(){
    let userId = Number(localStorage.getItem('userid'));
    this.ffService.getUserFriends(userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.friends = res;
      this.ffService.newFriend.subscribe(emitted => {
        this.friends.push(emitted);
        this.friends.sort((a, b) => a.user.displayName.localeCompare(b.user.displayName));
      });
      this.friends.sort((a, b) => a.user.displayName.localeCompare(b.user.displayName));      
    });
  }

}
