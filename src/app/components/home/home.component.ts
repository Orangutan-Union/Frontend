import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


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
}
