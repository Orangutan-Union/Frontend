import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit {

  @Input() post: Post;
  like: Like = new Like;
  userId: number = 0;

  
  constructor(private feedService: FeedService, private route: Router) { }

  ngOnInit(): void {
   
  }

}
