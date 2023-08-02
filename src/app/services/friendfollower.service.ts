import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FriendFollower } from '../models/friendfollower';
import { NewFriendFollower } from '../models/newFriendFollower';

const httpOptions={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FriendfollowerService {

  @Output() newFriend: EventEmitter<FriendFollower> = new EventEmitter();

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  updateFriendList(friend: FriendFollower){
    this.newFriend.emit(friend);
  }

  getUserFriends(id: number): Observable<FriendFollower[]>{
    return this.http.get<FriendFollower[]>(this.baseApiUrl + 'friendfollowers/' + id + '/friends');
  }

  getUserFollowers(id: number): Observable<FriendFollower[]>{
    return this.http.get<FriendFollower[]>(this.baseApiUrl + 'friendfollowers/' + id + '/followers');
  }

  getUserFollowing(id: number): Observable<FriendFollower[]>{
    return this.http.get<FriendFollower[]>(this.baseApiUrl + 'friendfollowers/' + id + '/following');
  }

  getBlockedUsers(id: number): Observable<FriendFollower[]>{
    return this.http.get<FriendFollower[]>(this.baseApiUrl + 'friendfollowers/' + id + '/blocked');
  }

  getBlockingUsers(id: number): Observable<FriendFollower[]>{
    return this.http.get<FriendFollower[]>(this.baseApiUrl + 'friendfollowers/' + id + '/blocking');
  }

  getBlockUserChat(userId: number, otherUserId: number): Observable<FriendFollower>{    
    return this.http.get<FriendFollower>(this.baseApiUrl + 'friendfollowers/' + userId + "/" + otherUserId + '/blockedUserChat');
  }

  followUser(targetId: number): Observable<FriendFollower>{
    let friendFollower = new NewFriendFollower;
    friendFollower.userId = Number(localStorage.getItem('userid'));
    friendFollower.otherUserId = targetId;
    return this.http.post<FriendFollower>(this.baseApiUrl + 'friendfollowers/follow', friendFollower, httpOptions);
  }

  unfollowUser(targetId: number): Observable<boolean>{
    let userId =  Number(localStorage.getItem('userid'));
    return this.http.delete<boolean>(this.baseApiUrl + 'friendfollowers/' + userId + '/unfollow/' + targetId, httpOptions);
  }

  blockUser(targetId: number): Observable<FriendFollower>{
    let userId =  Number(localStorage.getItem('userid'));
    return this.http.put<FriendFollower>(this.baseApiUrl + 'friendfollowers/' + userId + '/block/' + targetId, httpOptions);
  }

  unblockUser(targetId: number): Observable<boolean>{
    let userId = Number(localStorage.getItem('userid'));
    return this.http.delete<boolean>(this.baseApiUrl + 'friendfollowers/' + userId + '/unblock/' + targetId, httpOptions);
  }

  unfriendUser(targetId: number): Observable<boolean>{
    let userId = Number(localStorage.getItem('userid'));
    return this.http.delete<boolean>(this.baseApiUrl + 'friendfollowers/' + userId + '/unfriend/' + targetId, httpOptions);
  }

}
