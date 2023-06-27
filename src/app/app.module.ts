import { AppRoutingModule } from './app-routing.module';
import { AutosizeModule } from 'ngx-autosize';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/LoginPage/register/register.component';
import { LoginComponent } from './components/LoginPage/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/Profile/profil/profil.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SettingsComponent } from './components/Misc/setting/settings.component';
import { NavBarComponent } from './components/Misc/nav-bar/nav-bar.component';
import { ProfilTestingComponent } from './profil-testing/profil-testing.component';
import { FollowerFeedComponent } from './components/feeds/follower-feed/follower-feed.component';
import { FriendFeedComponent } from './components/feeds/friend-feed/friend-feed.component';
import { FeedComponent } from './components/feeds/feed/feed.component';
import { ProfileFeedComponent } from './components/Profile/profile-feed/profile-feed.component';
import { FullPostComponent } from './components/feeds/full-post/full-post.component';
import { CreatePostComponent } from './components/feeds/Post-Feed-componentsFolder/post-create/create-post.component';
import { VisitingProfilComponent } from './components/Profile/visiting-profil/visiting-profil.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { ChatSelectComponent } from './components/chat/chat-select/chat-select.component';
import { MessagesComponent } from './components/chat/messages/messages.component';
import { SendMessageComponent } from './components/chat/send-message/send-message.component';
import { FriendrequestsComponent } from './components/FriendsWithBenefits/friendrequests/friendrequests.component';
import { CommentsComponent } from './components/feeds/comments/comments.component';
import { PostHeaderComponent } from './components/feeds/Post-Feed-componentsFolder/post-header/post-header.component';
import { FeedComponentComponent } from './components/feeds/Post-Feed-componentsFolder/post-feed-component/feed-component.component';
import { PostToolbarComponent } from './components/feeds/Post-Feed-componentsFolder/post-toolbar/post-toolbar.component';
import { FriendlistComponent } from './components/FriendsWithBenefits/friendlist/friendlist.component';
import { FriendpageComponent } from './components/FriendsWithBenefits/friendpage/friendpage.component';

// ./components/feeds/post-feed-componentsFolder/post-toolbar/post-toolbar.component
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
    VisitingProfilComponent,
    ChatComponent,
    ChatSelectComponent,
    MessagesComponent,
    SendMessageComponent,
    CommentsComponent,
    FriendrequestsComponent,
    PostHeaderComponent,
    FeedComponentComponent,
    PostToolbarComponent,
    FriendlistComponent,
    FriendpageComponent,
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
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
    ChatSelectComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
