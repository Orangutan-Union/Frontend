import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FriendFollower } from 'src/app/models/friendfollower';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {

  @Input() friendFollowers: FriendFollower[];
  @Input() otherFriendFollowers: FriendFollower[] = [];
  userFriends: User[] = [];
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.gatherUsers();
  }

  ngOnChanges(changes: SimpleChanges){
    if (!changes['friendFollowers'].firstChange || !changes['otherFriendFollowers'].firstChange) {
      this.ngOnInit();
    }
  }

  gatherUsers(){
    this.userFriends = [];
    for (const ff of this.friendFollowers) {
      if (ff.otherUser !== null || ff.otherUser !== undefined && ff.type === 1) {
        this.userFriends.push(ff.otherUser);
      }
    }

    for (const ff of this.otherFriendFollowers) {
      if (ff.user !== null && ff.type === 1 && ff.user !== undefined) {
        this.userFriends.push(ff.user);
        
      }
    }
    this.userFriends.sort((a, b) => a.displayName.localeCompare(b.displayName));
    console.log('userFriends',this.userFriends);
    
  }

  goToUserProfile(id: number){
    this.route.navigate(['/visitingProfil/', id])
  }

}
