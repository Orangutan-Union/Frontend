import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed-component',
  templateUrl: './feed-component.component.html',
  styleUrls: ['./feed-component.component.css']
})
export class FeedComponentComponent implements OnInit {
  @Input() posts: Post
  @Input() i: number
  fileExtension: string | undefined = '';
  pictureExtensions: string[] = ['jpg','png','jpeg','gif'];
  constructor() { }

  ngOnInit(): void {
    if (this.posts.pictures.length > 0) {
      this.fileExtension = this.posts.pictures[0].imageUrl.split('.').pop();
    }
  }

}
