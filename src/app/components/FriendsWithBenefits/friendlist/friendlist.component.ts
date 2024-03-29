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
  currentUserId: number;
  constructor(private ffService: FriendfollowerService) { super(); }

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('userid'));
    this.getUserFriends();
  }

  getUserFriends(){
    this.ffService.getUserFriends(this.currentUserId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.friends = res;
      this.ffService.newFriend.pipe(takeUntil(this.unsubscribe$)).subscribe(emitted => {
        this.friends.push(emitted);
        this.friends.sort((a, b) => a.user.displayName.localeCompare(b.user.displayName));
      });
      this.friends.sort((a, b) => a.user.displayName.localeCompare(b.user.displayName));
    });
  }

}
