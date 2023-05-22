import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './components/profil/profil.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ChangeEmailDisplaynameComponent } from './components/change-email-displayname/change-email-displayname.component'
import { SettingsComponent } from './components/setting/settings.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfilTestingComponent } from './profil-testing/profil-testing.component'


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfilComponent,
    ChangeEmailDisplaynameComponent,
    SettingsComponent,
    NavBarComponent,
    ProfilTestingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        disallowedRoutes: []
      }
    })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
