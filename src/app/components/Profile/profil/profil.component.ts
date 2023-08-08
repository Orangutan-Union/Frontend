import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsub } from 'src/app/classes/unsub';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { takeUntil } from 'rxjs/operators'
import { Picture } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent extends Unsub implements OnInit {

  user: User = new User;
  userId: number = 0;
  formData = new FormData();
  postImages: Picture[] = [];
  TECPoints: number = 0;
  postCount: number = 0;
  constructor(private authService: AuthService, private route: Router, private picService: PictureService, private feedService: FeedService) { super(); }

  ngOnInit(): void {
    this.getUser()
    this.feedService.TECPoints.pipe(takeUntil(this.unsubscribe$)).subscribe(data =>{
      this.TECPoints = data
    })
    this.feedService.postCount.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.postCount = data
    })    
  }

  getUser(): void{
    this.userId = Number(localStorage.getItem('userid'));
    this.authService.getUserById(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (usr => {
        this.user = usr;
        console.log(this.user);
        this.picService.previewPictures.pipe(takeUntil(this.unsubscribe$)).subscribe(pics => {
          this.postImages = pics;
        })
      })
    });    
  }

  goToGroupSelect() {
    
  }

}
