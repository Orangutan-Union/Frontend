import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/LoginPage/login/login.component';
import { RegisterComponent } from './components/LoginPage/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/Profile/profil/profil.component';
import { SettingsComponent } from './components/Misc/setting/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { FullPostComponent } from './components/feeds/full-post/full-post.component';
import { VisitingProfilComponent } from './components/Profile/visiting-profil/visiting-profil.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { FriendrequestsComponent } from './components/FriendsWithBenefits/friendrequests/friendrequests.component';
import { ProfilTestingComponent } from './profil-testing/profil-testing.component';
import { FollowerFeedComponent } from './components/feeds/follower-feed/follower-feed.component';
import { FriendFeedComponent } from './components/feeds/friend-feed/friend-feed.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate:[AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  { path: 'fullPost/:id', component: FullPostComponent, canActivate:[AuthGuard]},
  { path: 'friendrequests', component: FriendrequestsComponent, canActivate:[AuthGuard]},
  { path: 'visitingProfil/:id', component: VisitingProfilComponent, canActivate:[AuthGuard] },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
