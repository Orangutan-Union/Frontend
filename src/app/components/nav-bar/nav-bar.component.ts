import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FriendRequest } from 'src/app/models/friendrequest';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FriendrequestService } from 'src/app/services/friendrequest.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  search: string = '';
  user: User = new User;
  userId: number = 0;
  formData = new FormData();
  private searchSubscription?: Subscription;
  private readonly searchSubject = new Subject<string | undefined>();
  searchUsers: User[] = [];
  constructor(private authService: AuthService, private route: Router, private friendreqService: FriendrequestService) { }

  ngOnInit(): void {
    this.getUser();
    this.searchWithDelay();
  }

  getUser(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.authService.getUserById(this.userId).subscribe({
      next: (usr => {
        this.user = usr;
        console.log(this.user);
      })
    });
  }

  logOff(): void {
    this.authService.logout();
  }

  onSearchQueryInput(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    if (searchQuery.trim().length > 1) {
      this.search = searchQuery;
      this.searchSubject.next(searchQuery?.trim());
    }
    else if (searchQuery.trim().length <= 1){
      this.searchUsers = [];
      this.search = '';
    }
  }

  searchWithDelay(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500), // Miliseconds after last input before searching starts
        switchMap(term => this.authService.getUsersBySearch(term!.trim()))
      )
      .subscribe(res => {
        if (this.search !== '') { // If statement prevents results from not matching query which could happen if you used backspace fast
          this.searchUsers = res.slice(0, 4);
        }                
      })
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  sendFriendRequest(receiverId: number):void{
    let request = new FriendRequest;
    request.senderId = Number(localStorage.getItem('userid'));
    request.receiverId = receiverId;
    this.friendreqService.sendFriendRequest(request).subscribe(() => {
      window.location.reload();
    });
  }

  sentFriendRequestPending(receiverId: number): boolean{
    // Check for friend requests sent by current user.
    for (const request of this.user.sentFriendRequests) {
      if (request.receiverId === receiverId) {
        return true;
      }
    }
    return false;
  }

  receivedFriendRequestPending(senderId: number): boolean{
    // Check for friend requests received by current user.
    for (const request of this.user.receivedFriendRequests) {
      if (request.senderId === senderId) {   
        return true;
      }
    }
    return false;
  }

  isFriend(receiverId: number): boolean{
    for (const request of this.user.userFriendFollowers) {
      if (request.otherUserId === receiverId && request.type === 1) {        
        return true;
      }
    }

    for (const request of this.user.otherUserFriendFollowers) {
      if (request.userId === receiverId && request.type === 1) {
        return true;
      }
    }
    return false;
  }

  goToProfile(id: number){
    this.route.navigate(['/visitingProfil/', id])
    .then(() => {
      window.location.reload();
    });
  }
}
