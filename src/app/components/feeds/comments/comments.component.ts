import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { FeedService } from 'src/app/services/feed.service';
import { NewComment } from 'src/app/models/newComment';
import { AuthService } from 'src/app/services/auth.service';
import { takeUntil } from 'rxjs';
import { Unsub } from 'src/app/classes/unsub';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent extends Unsub implements OnInit {

  @Input() commentLikeCounter: number[] = [];
  @Input() commentDislikeCounter: number[] = [];

  comment: Comment = new Comment;
  like: Like = new Like;
  newComment: NewComment = new NewComment;
  post: Post = new Post;
  userId: number = 0;
  commentCount: number = 0;
  commentLikeCount: number = 0;
  commentDislikeCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  commentCounter: number[] = [];
  constructor(private feedService: FeedService, private route: Router, private aRoute: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.aRoute.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      const id = Number(params.get('id'))
      this.getFullPost(id);
    });
  }
  onSubmit(): void {
    this.newComment.userId = Number(localStorage.getItem('userid'));
    this.newComment.postId = this.post.postId;

    this.feedService.addComment(this.newComment).pipe(takeUntil(this.unsubscribe$)).subscribe(newComment => {
      this.feedService.getCommentById(newComment.commentId).pipe(takeUntil(this.unsubscribe$)).subscribe(comment => {
        this.post.comments.push(comment)
        this.commentLikeCounter.push(0);
        this.commentDislikeCounter.push(0);
      })
    });
    this.newComment.content = '';
  }    
  
  likeComment(comment: Comment, i: number): void {
      this.like.userId = Number(localStorage.getItem('userid'));
      this.like.commentId = comment.commentId;
      this.like.isLiked = true;

      comment.likes.forEach(element => {
        if (element.userId == this.like.userId && element.commentId == comment.commentId) {
          this.like.isLiked = !element.isLiked
          element.isLiked = this.like.isLiked
          this.like.isDisliked = element.isDisliked;
          element.isDisliked = false
        }
      });

      if (comment.likes.filter(x => x.userId === this.like.userId).length === 0) {        
        this.commentLikeCounter[i]++
        this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
          console.log(data)
          this.getFullPost(this.post.postId);
        })
        return;
      }

      if (this.like.isDisliked == true && this.commentDislikeCounter[i] != 0) {
        this.commentDislikeCounter[i]--
        this.like.isDisliked = false;
      }
      
      if (this.like.isLiked == true) {
        this.commentLikeCounter[i]++

      }
      else {
        this.commentLikeCounter[i]--
      }

      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
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

      if (comment.likes.filter(x => x.userId === this.like.userId).length === 0) {        
        this.commentDislikeCounter[i]++
        this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
          console.log(data)
          this.getFullPost(this.post.postId);
        })
        return;
      }

      if (this.like.isLiked == true && this.commentLikeCounter[i] != 0) {
        this.commentLikeCounter[i]--
        this.like.isLiked = false;
      }
      if (this.like.isDisliked == true) {
        this.commentDislikeCounter[i]++

      }
      else {
        this.commentDislikeCounter[i]--
      }

      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        console.log(data)
      })
  }

  getFullPost(id: number): void {
    this.feedService.getFullPost(id).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.post = data;
      console.log(this.post);
    })
  }
}
