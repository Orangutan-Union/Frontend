import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/registerrequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: RegisterRequest = new RegisterRequest;
  constructor(private authService: AuthService, private router: Router) { }

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

}
