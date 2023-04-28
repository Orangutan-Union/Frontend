import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginrequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginRequest = new LoginRequest;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  navigate(): void{
    this.router.navigate(['/home'])
  }

  submitLogin(): void{
    this.authService.login(this.login)
    .subscribe({
      next: (login => {
        this.login = login;
        console.log(this.login);
        this.verify();
      })
    })
  }

  verify(): void{
    if (this.login.username !== '') {
      localStorage.setItem('userid', this.login.userId.toString());
      this.navigate();
    }
  }
}
