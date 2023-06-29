import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsub } from 'src/app/classes/unsub';
import { FriendRequest } from 'src/app/models/friendrequest';
import { FriendrequestService } from 'src/app/services/friendrequest.service';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent extends Unsub implements OnInit {
  friendRequests: FriendRequest[] = [];
  userId: number = 0;
  constructor(private frService: FriendrequestService, private route: Router) { super(); }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.getReceivedFriendRequests();
  }

  getReceivedFriendRequests(){
    this.frService.getReceivedRequests(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.friendRequests = res;
      console.log(this.friendRequests);      
    });
  }

  acceptFriendRequest(request: FriendRequest){
    this.frService.acceptFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      window.location.reload();
    });
  }

  declineFriendRequest(request: FriendRequest){
    this.frService.declineFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      window.location.reload();
    });
  }

}
