import { Component, OnInit } from '@angular/core';
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

  constructor(private feedService: FeedService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
      // this.feedService.
      console.log(this.post.content);
      
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
