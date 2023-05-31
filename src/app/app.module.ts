import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutosizeModule } from 'ngx-autosize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './components/profil/profil.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SettingsComponent } from './components/setting/settings.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfilTestingComponent } from './profil-testing/profil-testing.component';
import { FollowerFeedComponent } from './components/feeds/follower-feed/follower-feed.component';
import { FriendFeedComponent } from './components/feeds/friend-feed/friend-feed.component';
import { FeedComponent } from './components/feeds/feed/feed.component';
import { ProfileFeedComponent } from './components/feeds/profile-feed/profile-feed.component';
import { FullPostComponent } from './components/feeds/full-post/full-post.component';
import { CreatePostComponent } from './components/feeds/create-post/create-post.component';
import { VisitingProfilComponent } from './components/visiting-profil/visiting-profil.component'


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
    SettingsComponent,
    NavBarComponent,
    ProfilTestingComponent,
    FollowerFeedComponent,
    FriendFeedComponent,
    FeedComponent,
    ProfileFeedComponent,
    FullPostComponent,
    CreatePostComponent,
    VisitingProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    AutosizeModule,
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
