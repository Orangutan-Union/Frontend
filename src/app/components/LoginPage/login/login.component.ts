import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/models/authenticatedresponse';
import { LoginRequest } from 'src/app/models/loginrequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;
  login: LoginRequest = new LoginRequest;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLogin(): void{
    this.authService.login(this.login)
    .subscribe({
      next: (response: AuthenticatedResponse) => {
        this.authService.storeToken(response.accessToken);
        this.authService.storeRefreshToken(response.refreshToken);
        localStorage.setItem('userid', response.userId.toString());
        this.invalidLogin = false;
        console.log(response);
        this.router.navigate(['/home'])
      },
      error: (err: HttpErrorResponse) => this.invalidLogin = true
    })
  }
}
