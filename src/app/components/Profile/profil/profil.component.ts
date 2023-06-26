import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User = new User;
  userId: number = 0;
  formData = new FormData();
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.getUser()
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

}
