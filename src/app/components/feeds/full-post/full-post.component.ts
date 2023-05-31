import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { FeedService } from 'src/app/services/feed.service';
import { NewComment } from 'src/app/models/newComment';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {
  item={text:""}
  post: Post = new Post;
  like: Like = new Like;
  comment: NewComment = new NewComment
  userId: number = 0;
  commentCount: number = 0;
  commentLikeCount: number = 0;
  commentDislikeCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  commentCounter: number[] = [];
  commentLikeCounter: number[] = [];
  commentDislikeCounter: number[] = [];
  

  formdata = FormData;

  constructor(private feedService: FeedService, private route: Router, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'))
      //console.log(id);      
      this.getFullPost(id);
    });
  }

  onSubmit(): void{
    if (!this.comment.content.match(/^\s*$/)) {

      console.log(this.comment.content);
      
      // this.authService.register(this.user)
      // .subscribe({
      //   next: (reg => {
      //     this.user = reg;
      //     console.log(this.user);
      //     this.router.navigate(['/login']);
      //   })
      // });

    }
  }  

  likePost(post: Post): void {
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

      if (this.like.isDisliked == true && this.dislikeCounter[0] != 0) {
        this.dislikeCounter[0]--
        this.like.isDisliked = false;
      }

      if (this.like.isLiked == true) {
        this.likeCounter[0]++
      }
      else {
        this.likeCounter[0]--
      }

      this.feedService.addLike(this.like).subscribe(data => {
        console.log(data)
      })
  }

  dislikePost(post: Post): void {
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

      if (this.like.isLiked == true && this.likeCounter[0] != 0) {
        this.likeCounter[0]--
        this.like.isLiked = false;
      }
      console.log(this.like.isLiked);

      if (this.like.isDisliked == true) {
        this.dislikeCounter[0]++

      }
      else {
        this.dislikeCounter[0]--
      }

      this.feedService.addLike(this.like).subscribe(data => {
        console.log(data)
      })
  }

  likeComment(comment: Comment, i: number): void {
      this.like.userId = Number(localStorage.getItem('userid'));
      this.like.commentId = comment.commentId;
      this.like.isDisliked = true;

      comment.likes.forEach(element => {
        if (element.userId == this.like.userId && element.commentId == comment.commentId) {
          this.like.isLiked = !element.isLiked
          element.isLiked = this.like.isLiked
          this.like.isDisliked = element.isDisliked;
          element.isDisliked = false
        }
      });

      if (this.like.isDisliked == true && this.commentDislikeCounter[i] != 0) {
        this.commentDislikeCounter[i]--
        this.like.isDisliked = false;
      }
      console.log(this.like.isLiked);

      if (this.like.isLiked == true) {
        this.commentLikeCounter[i]++

      }
      else {
        this.commentLikeCounter[i]--
      }

      this.feedService.addLike(this.like).subscribe(data => {
        console.log(data)
      })
  }

  dislikeComment(comment: Comment, i: number): void {
      this.like.userId = Number(localStorage.getItem('userid'));
      this.like.commentId = comment.commentId;
      this.like.isDisliked = true;

      comment.likes.forEach(element => {
        if (element.userId == this.like.userId && element.commentId == comment.commentId) {
          this.like.isDisliked = !element.isDisliked
          element.isDisliked = this.like.isDisliked
          this.like.isLiked = element.isLiked;
          element.isLiked = false
        }
      });

      if (this.like.isLiked == true && this.commentLikeCounter[i] != 0) {
        this.commentLikeCounter[i]--
        this.like.isLiked = false;
      }
      console.log(this.like.isLiked);

      if (this.like.isDisliked == true) {
        this.commentDislikeCounter[i]++

      }
      else {
        this.commentDislikeCounter[i]--
      }

      this.feedService.addLike(this.like).subscribe(data => {
        console.log(data)
      })
  }

  goToGroup(id: number) {
    this.route.navigate([])
  }

  getFullPost(id: number): void {
    this.feedService.getFullPost(id).subscribe(data => {
      this.post = data;
      this.counter(this.post);
      console.log(this.post);
    })
  }

  counter(post: Post): void {
    post.likes.forEach(like => {
      if (like.isLiked == true) { this.likeCount++ }
      if (like.isDisliked == true) { this.dislikeCount++ }
    });
    this.likeCounter.push(this.likeCount);
    this.dislikeCounter.push(this.dislikeCount);

    post.comments.forEach(comment => {
      console.log(comment.likes);
      comment.likes.forEach(like => {
        if (like.isLiked == true) { this.commentLikeCount++ }
        if (like.isDisliked == true) { this.commentDislikeCount++ }
      })
      this.commentCount++

      this.commentLikeCounter.push(this.commentLikeCount);
      this.commentDislikeCounter.push(this.commentDislikeCount);

      this.commentLikeCount = 0;
      this.commentDislikeCount = 0;
    });

    this.commentCounter.push(this.commentCount)

    this.likeCount = 0;
    this.dislikeCount = 0;
  }
}
