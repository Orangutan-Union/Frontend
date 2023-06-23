import { Component, Input, OnInit } from '@angular/core';
import { NewPost } from 'src/app/models/newPost';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: NewPost = new NewPost
  @Input() posts: any[] = [];
  @Input() commentCounter: number[] = [];
  @Input() likeCounter: number[] = [];
  @Input() dislikeCounter: number[] = [];
  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    console.log(this.posts);    
  }

  onSubmit(): void {
    this.post.userId = Number(localStorage.getItem('userid'));

    this.feedService.addPost(this.post).subscribe(newPost => {
      this.feedService.getFullPost(newPost.postId).subscribe(newPost => {
        this.posts.unshift(newPost);
        this.commentCounter.unshift(0);
        this.likeCounter.unshift(0);
        this.dislikeCounter.unshift(0);
      })
    })

    this.post.content = '';
  }
}
