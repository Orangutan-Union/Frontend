import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Unsub } from 'src/app/classes/unsub';
import { FriendRequest } from 'src/app/models/friendrequest';
import { FriendrequestService } from 'src/app/services/friendrequest.service';
import { takeUntil } from 'rxjs/operators'
import { User } from 'src/app/models/user';
import { FriendFollower } from 'src/app/models/friendfollower';
import { FriendfollowerService } from 'src/app/services/friendfollower.service';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent extends Unsub implements OnInit {

  receivedFriendRequests: FriendRequest[] = [];
  sentFriendRequests: FriendRequest[] = [];
  receivedOnly: boolean = true;
  userId: number = 0;
  constructor(private frService: FriendrequestService, private route: Router, private ffService: FriendfollowerService) { super(); }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.getAllFriendRequests();
  }

  getAllFriendRequests(){
    this.frService.getAllRequests(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.receivedFriendRequests = res.filter(x => x.receiverId === this.userId);
      this.sentFriendRequests = res.filter(x => x.senderId === this.userId);
    });
  }

  acceptFriendRequest(request: FriendRequest){
    let friend: FriendFollower = new FriendFollower;
    this.frService.acceptFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.receivedFriendRequests = this.receivedFriendRequests.filter(x => x.senderId !== request.senderId);
      friend.user = request.sender;
      friend.otherUserId = request.receiverId
      friend.type = 1
      friend.userId = request.senderId
      this.ffService.updateFriendList(friend);
      if (this.receivedFriendRequests.length === 0) {
        this.frService.updateNotificationDot(false);
      }
    });
  }

  declineFriendRequest(request: FriendRequest){
    this.frService.declineFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.receivedFriendRequests = this.receivedFriendRequests.filter(x => x.senderId !== request.senderId);
      
      if (this.receivedFriendRequests.length === 0) {
        this.frService.hasNotification.emit(false);
      }
    });
  }

  cancelFriendRequest(request: FriendRequest){
    this.frService.declineFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.sentFriendRequests = this.sentFriendRequests.filter(x => x.receiverId !== request.receiverId)      
    });
  }

}
