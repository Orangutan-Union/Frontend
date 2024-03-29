import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsub } from 'src/app/classes/unsub';
import { ChangePassword } from 'src/app/models/changepassword';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { takeUntil } from 'rxjs/operators'
import { PictureService } from 'src/app/services/picture.service';
import { LoginComponent } from '../../LoginPage/login/login.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends Unsub implements OnInit {

  rerender = false;
  tt: ChangePassword = new ChangePassword;
  user: User = new User;
  userId: number = 0;
  formData = new FormData();
  constructor(private authService: AuthService, private route: Router, private picService: PictureService) { super(); }

  ngOnInit(): void {
    this.getUser();
  }

  fileChange(files: any) {
    if (files && files.length > 0) {
      let file = files[0];
      this.formData.append('file', file);
      this.formData.append('filename', file.filename);
      this.onUpload(); 
    }
  }

  onUpload(){
    console.log("In Upload method");
    this.authService.uploadImage(Number(localStorage.getItem('userid')), this.formData).pipe(takeUntil(this.unsubscribe$)).subscribe(val => {
      this.getUser();
      this.formData.delete('file')
      this.formData.delete('filename')
      this.route.navigate(['/settings'])
      this.picService.updateNavbarPicture(val.picture.imageUrl);
    });
    
  }

  getUser(): void{
    this.userId = Number(localStorage.getItem('userid'));
    this.authService.getUserById(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (usr => {
        this.user = usr;
        console.log(this.user);
      })
    });
  }

  onSubmit(): void{
    this.authService.updateUser(this.user).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  changePassword(): void{
    this.tt.userId = Number(localStorage.getItem('userid'));
    this.authService.changePassword(this.tt).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  onSubmitCheck(): void{
    if(this.tt.newPassword != "" && this.tt.oldPassword != ""){      
      this.changePassword();
    }

    this.onSubmit();
    window.location.reload();
  }
}
