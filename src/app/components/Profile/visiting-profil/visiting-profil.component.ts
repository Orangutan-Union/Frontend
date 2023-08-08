import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsub } from 'src/app/classes/unsub';
import { Like } from 'src/app/models/addLike';
import { FriendFollower } from 'src/app/models/friendfollower';
import { FriendRequest } from 'src/app/models/friendrequest';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { FriendfollowerService } from 'src/app/services/friendfollower.service';
import { FriendrequestService } from 'src/app/services/friendrequest.service';
import { takeUntil } from 'rxjs/operators'
import { Picture } from 'src/app/models/picture';

@Component({
  selector: 'app-visiting-profil',
  templateUrl: './visiting-profil.component.html',
  styleUrls: ['./visiting-profil.component.css']
})
export class VisitingProfilComponent extends Unsub implements OnInit {
  currentUserFollowing: FriendFollower[] = [];
  currentUserId: number = 0;
  user: User = new User;
  userId: number = 0;
  friends: boolean = false;
  following: boolean = false;
  hasBlocked: boolean = false;
  isBlocked: boolean = false;
  sentRequestPending: boolean = false;
  receivedRequestPending: boolean = false;
  posts: Post[] = [];
  like: Like = new Like;
  commentCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  commentCounter: number[] = [];
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  TECPoints: number = 0;
  postCount: number = 0;
  constructor(private feedService: FeedService, private route: Router, private aRoute: ActivatedRoute,
    private authService: AuthService, private ffService: FriendfollowerService,
    private friendreqService: FriendrequestService, private cdr: ChangeDetectorRef) { super();}

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('userid'));
    this.aRoute.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.userId = Number(params.get('id'))
      this.getUser(this.userId);
      this.getUserPosts(this.userId);
      this.getCurrentUserFollowers();      
    });
  }

  TecPointsCount(p: Post[]){    
    p.forEach( element => {      
      element.likes.forEach( element => {
        if(element.isLiked){this.TECPoints += 1}
        if(element.isDisliked){this.TECPoints -= 1}
      })
    });
  }

  goToFullPost(id: number) {  
    this.route.navigate(['/fullPost/', id])
  }

  goToGroup(id: number) {
    this.route.navigate([])
  }

  likePost(post: Post, i: number): void {
    this.like.userId = Number(localStorage.getItem('userid'));
    this.like.postId = post.postId;
    this.like.isLiked = true;
    
    post.likes.forEach(element => {
      if (element.userId == this.like.userId && element.postId == post.postId) {
        this.like.isLiked = !element.isLiked
        element.isLiked = this.like.isLiked
        this.like.isDisliked = element.isDisliked;
        element.isDisliked = false
      }
    });

    if (post.likes.filter(x => x.userId === this.like.userId).length === 0) {
      this.likeCounter[i]++
      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        console.log(data)
        this.getUserPosts(this.user.userId);
      })
      return;
    }
    

    if (this.like.isDisliked == true && this.dislikeCounter[i] != 0) {
      this.dislikeCounter[i]--
      this.like.isDisliked = false;
    }

    if (this.like.isLiked == true) {
      this.likeCounter[i]++
    }
    else {
      this.likeCounter[i]--
    }

    this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data)
    })
  }

  dislikePost(post: Post, i: number): void {
    this.like.userId = Number(localStorage.getItem('userid'));
    this.like.postId = post.postId;
    this.like.isDisliked = true;

    post.likes.forEach(element => {
      if (element.userId == this.like.userId && element.postId == post.postId) {
        this.like.isDisliked = !element.isDisliked
        element.isDisliked = this.like.isDisliked
        this.like.isLiked = element.isLiked;    
        element.isLiked = false    
      }
    });

    if (post.likes.filter(x => x.userId === this.like.userId).length === 0) {
      this.dislikeCounter[i]++
      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        console.log(data)
        this.getUserPosts(this.user.userId);
      })
      return;
    }
    
    if (this.like.isLiked == true && this.likeCounter[i] != 0) {
      this.likeCounter[i]--
      this.like.isLiked = false;
    }
    console.log(this.like.isLiked);   

    if (this.like.isDisliked == true) {
      this.dislikeCounter[i]++

    }
    else {
      this.dislikeCounter[i]--
    }

    this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data)
    })
  }

  getUserPosts(id: number): void {
    this.feedService.getUserPosts(id).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.posts = data;
      this.counter(this.posts);
      this.postCount = this.posts.length
      this.TecPointsCount(data)
    })
  }

  counter(posts: Post[]): void {
    posts.forEach(post => {
      post.likes.forEach(like => {
        if (like.isLiked == true) { this.likeCount++ }
        if (like.isDisliked == true) { this.dislikeCount++ }
      });
      this.likeCounter.push(this.likeCount);
      this.dislikeCounter.push(this.dislikeCount);
      
      post.comments.forEach(comment => {
        this.commentCount++
      });
      this.commentCounter.push(this.commentCount);

      this.likeCount = 0;
      this.dislikeCount = 0;
      this.commentCount = 0;
    });
  }

  getUser(id: number){
    this.authService.getUserById(id).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.user = res;
      this.isFriend();      
      this.blockStatus();
      this.sentFriendRequestPending();
   });
  }

  blockStatus(){    
    if (this.user.userFriendFollowers.filter(x => x.type === 3).length === 0 && this.user.otherUserFriendFollowers.filter(x => x.type === 3).length === 0) {
      this.isBlocked = false;
      this.hasBlocked = false;
      return;
    }

    for (const ff of this.user.userFriendFollowers) {      
      // Check if the person has blocked current user
      if (this.user.userId === ff.userId && ff.type === 3  && ff.otherUserId === this.currentUserId){
        this.isBlocked = true;
      }
    }

    for (const ff of this.user.otherUserFriendFollowers) {      
      // Check if current user has blocked the person
      if (this.currentUserId === ff.userId && ff.type === 3 && ff.otherUserId === this.user.userId) {
        this.hasBlocked = true;
      }
    }
  }

  isFriend(){
    // Check if there are any friends
    if (this.user.userFriendFollowers.filter(x => x.type === 1).length === 0 && this.user.otherUserFriendFollowers.filter(x => x.type === 1).length === 0) {
      this.friends = false;      
      return
    }
    
    // Check if current user is in the left side of the friends table
    for (const friend of this.user.userFriendFollowers) {
      if (this.currentUserId === friend.otherUserId && friend.type === 1 || this.currentUserId === friend.userId && friend.type === 1) {        
        this.friends = true;
        return;
      }
      else{
        this.friends = false;        
      }
    }

    // Check if current user is in the right side of the friends table
    for (const friend of this.user.otherUserFriendFollowers) {
      if (this.currentUserId === friend.otherUserId && friend.type === 1 || this.currentUserId === friend.userId && friend.type === 1) {        
        this.friends = true;
        return;
      }
      else{
        this.friends = false;
      }
    }    
  }

  getCurrentUserFollowers(){
    this.ffService.getUserFollowing(Number(localStorage.getItem('userid'))).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.currentUserFollowing = res;
      this.isFollowing();
    });
  }

  isFollowing(){    
    if (this.currentUserFollowing.length === 0) {
      this.following = false;
      return;
    }

    for (const following of this.currentUserFollowing) {
      if (following.userId === this.user.userId && following.type === 2 || following.otherUserId === this.user.userId && following.type === 2) {
        this.following = true;
        return;
      }
      else{
        this.following = false;
      }
    }    
  }

  followUser(){
    this.ffService.followUser(this.user.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.following = true;
      this.cdr.detectChanges();
      console.log(res);      
    });
  }

  unfollowUser(){
    this.ffService.unfollowUser(this.user.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.following = false;
      this.cdr.detectChanges();
      console.log(res);      
    });
  }

  blockUser(){
    this.ffService.blockUser(this.user.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      console.log(res);
      this.hasBlocked = true;
      this.following = false;
      this.cdr.detectChanges();
    });
  }

  unblockUser(){
    this.ffService.unblockUser(this.user.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      console.log(res);
      this.hasBlocked = false;
      this.cdr.detectChanges();
    });
  }

  sendFriendRequest():void{
    let request = new FriendRequest;
    request.senderId = Number(localStorage.getItem('userid'));
    request.receiverId = this.user.userId;
    this.friendreqService.sendFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.sentRequestPending = true;
      this.cdr.detectChanges();
    });
  }

  sentFriendRequestPending(){
    // Check if person has received a friendrequest from current user
    for (const request of this.user.receivedFriendRequests) {
      if (request.senderId === this.currentUserId) {
        this.sentRequestPending = true;
      }
    }

    // Check if current user has received a friendrequest from the person
    for (const request of this.user.sentFriendRequests) {
      if (request.receiverId === this.currentUserId) {
        this.receivedRequestPending = true;
      }
    }
  }

  unfriendUser(){
    this.ffService.unfriendUser(this.user.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      console.log(res);
      this.friends = false;
      this.cdr.detectChanges();
      // window.location.reload();
    });
  }

  cancelFriendRequest(){
    let request: FriendRequest = new FriendRequest
    request.senderId = this.currentUserId;
    request.receiverId = this.user.userId;
    this.friendreqService.declineFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.sentRequestPending = false;
      this.receivedRequestPending = false;
      this.cdr.detectChanges();
    });
  }

  acceptFriendRequest(){
    let request: FriendRequest = new FriendRequest
    request.senderId = this.user.userId;
    request.receiverId = this.currentUserId;
    this.friendreqService.acceptFriendRequest(request).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.friends = true
      this.sentRequestPending = false;
      this.receivedRequestPending = false;
      this.cdr.detectChanges();
    });
  }
}
