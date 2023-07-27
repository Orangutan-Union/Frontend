import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { FeedService } from 'src/app/services/feed.service';
import { NewComment } from 'src/app/models/newComment';
import { Unsub } from 'src/app/classes/unsub';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent extends Unsub implements OnInit {
  comment: Comment = new Comment;
  like: Like = new Like;
  newComment: NewComment = new NewComment;
  post: Post = new Post;
  edit: boolean = true;
  newContent: string;
  editCommentId: number = 0;
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
  
  constructor(private feedService: FeedService, private route: Router, private aRoute: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.aRoute.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      const id = Number(params.get('id'))
      this.getFullPost(id);
    });
  }

  deletePost(i: number): void {
    this.feedService.deletComment(this.post.comments[i].commentId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data);
    })
    this.post.comments.splice(i, 1);
  }

  toggleEdit(post: Post) {
    if (this.editCommentId == post.postId) {
      this.edit = !this.edit;
    }
    this.editCommentId = post.postId;
    this.newContent = post.content;
  }

  onSubmit(): void {
    this.newComment.userId = Number(localStorage.getItem('userid'));
    this.newComment.postId = this.post.postId;

    this.feedService.addComment(this.newComment).pipe(takeUntil(this.unsubscribe$)).subscribe(newComment => {
      this.feedService.getCommentById(newComment.commentId).pipe(takeUntil(this.unsubscribe$)).subscribe(comment => {
        this.post.comments.unshift(comment)
      })
    });
    this.newComment.content = '';
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

      if (post.likes.filter(x => x.userId === this.like.userId).length === 0) {
        this.likeCounter[0]++
        this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
          console.log(data)
          this.getFullPost(this.post.postId);
        })
        return;
      }

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

      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
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

      if (post.likes.filter(x => x.userId === this.like.userId).length === 0) {
        this.dislikeCounter[0]++
        this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
          console.log(data)
          this.getFullPost(this.post.postId);
        })
        return;
      }

      if (this.like.isLiked == true && this.likeCounter[0] != 0) {
        this.likeCounter[0]--
        this.like.isLiked = false;
      }

      if (this.like.isDisliked == true) {
        this.dislikeCounter[0]++

      }
      else {
        this.dislikeCounter[0]--
      }

      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        console.log(data)
      })
  }

  goToGroup(id: number) {
    this.route.navigate([])
  }

  getFullPost(id: number): void {
    this.feedService.getFullPost(id).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
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
