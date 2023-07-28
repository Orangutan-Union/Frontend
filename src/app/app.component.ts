import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PictureService } from './services/picture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TECHUB_INC';
  IsLogIn: Boolean = true

  constructor(private authService: AuthService){}
  ngOnInit(){
    this.authService.showNavbar.subscribe(emitted => {
      this.IsLogIn = emitted;
    });
  }

}
