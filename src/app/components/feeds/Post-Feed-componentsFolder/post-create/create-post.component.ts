import { Component, Input, OnInit } from '@angular/core';
import { Unsub } from 'src/app/classes/unsub';
import { NewPost } from 'src/app/models/newPost';
import { FeedService } from 'src/app/services/feed.service';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent extends Unsub implements OnInit {
  post: NewPost = new NewPost
  formData = new FormData();
  file: any;
  @Input() groupId: number;
  @Input() posts: any[] = [];
  @Input() commentCounter: number[] = [];
  @Input() likeCounter: number[] = [];
  @Input() dislikeCounter: number[] = [];
  constructor(private feedService: FeedService) { super(); }

  ngOnInit(): void {
    
  }

  onSubmit(): void {    
    this.post.userId = Number(localStorage.getItem('userid'));
    this.formData.append('user_id', this.post.userId.toString());
    this.formData.append('content', this.post.content);
    this.formData.append('longitude', this.post.longtitude.toString());
    this.formData.append('latitude', this.post.latitude.toString());
    console.log(this.groupId);
    
    if (this.groupId !== null && this.groupId !== undefined) {
      this.formData.append('group_id', this.groupId!.toString());
    }
    else {
      this.formData.append('group_id', '');
    }
    console.log(this.formData);
    
    
    this.feedService.addPost(this.formData).pipe(takeUntil(this.unsubscribe$)).subscribe(newPost => {
      this.feedService.getFullPost(newPost.postId).pipe(takeUntil(this.unsubscribe$)).subscribe(newPost => {
        this.posts.unshift(newPost);
        this.commentCounter.unshift(0);
        this.likeCounter.unshift(0);
        this.dislikeCounter.unshift(0);
        this.cleanFormData();
      })
    })

    this.post.content = '';
  }

  fileChange(files: any) {
    if (files && files.length > 0) {
      this.file = files[0];
      this.formData.append('file', this.file);
      this.formData.append('filename', this.file.name);
    }
  }

  cleanFormData() {
    this.file = undefined;
    this.formData.delete('file');
    this.formData.delete('filename');
    this.formData.delete('post');
    this.formData.delete('content');
    this.formData.delete('longitude');
    this.formData.delete('longitude');
    this.formData.delete('group_id');
  }
}
