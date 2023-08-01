import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Unsub } from 'src/app/classes/unsub';
import { Like } from 'src/app/models/addLike';
import { NewPost } from 'src/app/models/newPost';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';
import { takeUntil } from 'rxjs/operators'
import { Picture } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';
import { outputAst } from '@angular/compiler';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.css']
})
export class ProfileFeedComponent extends Unsub implements OnInit {
  editPostId: number = 0;
  userId: number = 0;
  commentCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  newContent: string;
  edit: boolean = true;
  like: Like = new Like;
  uPost: Post = new Post;
  posts: Post[] = [];
  commentCounter: number[] = [];
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  postImages: Picture[] = [];
  TECPoints: number = 0
  postCount: number = 0
  
  constructor(private feedService: FeedService, private route: Router, private picService: PictureService) { super(); }

  ngOnInit(): void {
    this.getUserPosts();
  }

  TecPointsCount(p: Post[]){    
    p.forEach( element => {      
      element.likes.forEach( element => {
        if(element.isLiked){this.TECPoints += 1}
        if(element.isDisliked){this.TECPoints -= 1}
      })
    });
    this.feedService.getPoints(this.postCount, this.TECPoints)
  }

  deletePost(i: number): void {
    this.feedService.deletePost(this.posts[i].postId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data);
    })
    this.posts.splice(i, 1);
  }

  onSubmit(i: number): void {
    this.posts[i].content = this.newContent;
    this.feedService.updatePost(this.posts[i]).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
    })
    this.editPostId = 0;
  }

  toggleEdit(post: Post) {
    if (this.editPostId == post.postId) {
      this.edit = !this.edit;
    }
    this.editPostId = post.postId;
    this.newContent = post.content;
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
        this.getUserPosts();
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
        this.getUserPosts();
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

  getUserPosts(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.feedService.getUserPosts(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.posts = data;
      this.counter(this.posts);
      console.log(this.posts);
      this.postCount = this.posts.length
      
      // Add all images from posts so profile-images component can display them.
      this.posts.forEach(x => {
        if (x.pictures.length > 0) {
          this.postImages.push(x.pictures[0]);
        }
      });
      this.picService.updatePreviewPictures(this.postImages);
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
}
