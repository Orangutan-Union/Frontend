import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/models/changepassword';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  tt: ChangePassword = new ChangePassword;
  user: User = new User;
  userId: number = 0;
  formData = new FormData();
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  fileChange(files: any) {
    if (files && files.length > 0) {
      let file = files[0];
      this.formData.append('file', file);
      this.formData.append('filename', file.filename);
    }
  }

  onUpload(){
    console.log("In Upload method");
    this.authService.uploadImage(Number(localStorage.getItem('userid')), this.formData).subscribe(() => {
      this.getUser();
      this.formData.delete('file')
      this.formData.delete('filename')
      this.route.navigate(['/home'])
    });
  }

  getUser(): void{
    this.userId = Number(localStorage.getItem('userid'));
    this.authService.getUserById(this.userId).subscribe({
      next: (usr => {
        this.user = usr;
        console.log(this.user);
      })
    });
  }

  onSubmit(): void{
    this.authService.updateUser(this.user).subscribe();
  }

  changePassword(): void{
    this.tt.userId = Number(localStorage.getItem('userid'));
    this.authService.changePassword(this.tt).subscribe();
  }
}
