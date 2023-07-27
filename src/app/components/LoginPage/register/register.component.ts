import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsub } from 'src/app/classes/unsub';
import { RegisterRequest } from 'src/app/models/registerrequest';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends Unsub implements OnInit {

  baseApiUrl: string = environment.baseApiUrl;
  user: RegisterRequest = new RegisterRequest;
  constructor(
    private authService: AuthService, 
    private router: Router,
    ) { super(); }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.authService.register(this.user).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (reg => {
        this.user = reg;
        console.log(this.user);
        this.router.navigate(['/login']);
      })
    });
  }
}
