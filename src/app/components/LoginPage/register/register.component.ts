import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/registerrequest';
import { AuthService } from 'src/app/services/auth.service';
import { PictureService } from 'src/app/services/picture.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData = new FormData();
  //Above is for adding an image to the DB for when/if we delete the database.

  baseApiUrl: string = environment.baseApiUrl;
  user: RegisterRequest = new RegisterRequest;
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private pictureService: PictureService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.authService.register(this.user)
    .subscribe({
      next: (reg => {
        this.user = reg;
        console.log(this.user);
        this.router.navigate(['/login']);
      })
    });
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
    this.pictureService.addPicture(this.formData).subscribe();
  }

}
