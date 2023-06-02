import { Component, OnInit } from '@angular/core';
import { FriendRequest } from 'src/app/models/friendrequest';
import { FriendrequestService } from 'src/app/services/friendrequest.service';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {
  friendRequests: FriendRequest[] = [];
  userId: number = 0;
  constructor(private frService: FriendrequestService) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.getReceivedFriendRequests();
  }

  getReceivedFriendRequests(){
    this.frService.getReceivedRequests(this.userId).subscribe(res => {
      this.friendRequests = res;
      console.log(this.friendRequests);
      
    });
  }

}
