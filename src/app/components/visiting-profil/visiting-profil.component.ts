import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { NewComment } from 'src/app/models/newComment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-visiting-profil',
  templateUrl: './visiting-profil.component.html',
  styleUrls: ['./visiting-profil.component.css']
})
export class VisitingProfilComponent implements OnInit {
  posts: Post[] = [];  
  user: User = new User;
  like: Like = new Like;
  commentCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  commentCounter: number[] = [];
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  TECPoints: number = 0;
  postCount: number = 0;

  constructor(private GetAuth: AuthService, private feedService: FeedService, private route: Router, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'))
      this.getUser(id);
      this.getUserPosts(id);
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
      this.postCount = this.posts.length
      this.TecPointsCount(data)
    })
  }

  getUser(id: number): void{
    this.GetAuth.getUserById(id).subscribe(data => {
      this.user = data;      
      console.log(this.user);
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
}
