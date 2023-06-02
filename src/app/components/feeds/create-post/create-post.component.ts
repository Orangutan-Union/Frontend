import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewPost } from 'src/app/models/newPost';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: NewPost = new NewPost
  @Input() posts: any[] = []
  constructor(private feedService: FeedService, private route: Router) { }

  ngOnInit(): void {
    console.log(this.posts);    
  }

  onSubmit(): void {
    this.post.userId = Number(localStorage.getItem('userid'));

    this.feedService.addPost(this.post).subscribe(newPost => {
      this.feedService.getFullPost(newPost.postId).subscribe(newPost => {
        this.posts.unshift(newPost)
      })
    })

    this.post.content = '';
  }
}
