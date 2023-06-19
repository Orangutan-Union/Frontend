import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { FriendFollower } from 'src/app/models/friendfollower';
import { NewComment } from 'src/app/models/newComment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { FriendfollowerService } from 'src/app/services/friendfollower.service';

@Component({
  selector: 'app-visiting-profil',
  templateUrl: './visiting-profil.component.html',
  styleUrls: ['./visiting-profil.component.css']
})
export class VisitingProfilComponent implements OnInit {
  currentUserFollowing: FriendFollower[] = [];
  user: User = new User;
  friends: boolean = false;
  following: boolean = false;
  posts: Post[] = [];  
  like: Like = new Like;
  commentCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  commentCounter: number[] = [];
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];

  constructor(private feedService: FeedService, private route: Router, private aRoute: ActivatedRoute, private authService: AuthService, private ffService: FriendfollowerService) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'))
      console.log(id);      
      this.getUserPosts(id);
      this.getUser(id);
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

    this.feedService.addLike(this.like).subscribe(data => {
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

    this.feedService.addLike(this.like).subscribe(data => {
      console.log(data)
    })
  }

  getUserPosts(id: number): void {
    this.feedService.getUserPosts(id).subscribe(data => {
      this.posts = data;
      this.counter(this.posts);
      console.log(this.posts);
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
    this.authService.getUserById(id).subscribe(res => {
      this.user = res;
      this.isFriend();
   });
  }

  isFriend(){    
    let userId: number = Number(localStorage.getItem('userid'));

    // Check if there are any friends
    if (this.user.userFriendFollowers.filter(x => x.type === 1).length === 0 || this.user.otherUserFriendFollowers.filter(x => x.type === 1).length === 0) {
      this.friends = false;      
      return
    }
    
    // Check if current user is in the left side of the friends table
    for (const friend of this.user.userFriendFollowers) {
      if (userId === friend.otherUserId && friend.type === 1 || userId === friend.userId && friend.type === 1) {        
        this.friends = true;
        return;
      }
      else{
        this.friends = false;        
      }
    }

    // Check if current user is in the right side of hte friends table
    for (const friend of this.user.otherUserFriendFollowers) {
      if (userId === friend.otherUserId && friend.type === 1 || userId === friend.userId && friend.type === 1) {        
        this.friends = true;
        return;
      }
      else{
        this.friends = false;
      }
    }    
  }

  getCurrentUserFollowers(){
    this.ffService.getUserFollowers(Number(localStorage.getItem('userid'))).subscribe(res => {
      this.currentUserFollowing = res;
      console.log(this.currentUserFollowing);
      this.isFollowing();
    });
  }

  isFollowing(){
    if (this.currentUserFollowing.filter(x => x.otherUserId === this.user.userId || x.userId === this.user.userId)) {
      this.following = true;
    }
    else{
      this.following = false;
    }
    // for (const follower of this.currentUserFollowing) {
    //   if (condition) {
        
    //   }
    // }
  }
}
