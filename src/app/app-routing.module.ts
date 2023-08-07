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
import { FriendpageComponent } from './components/FriendsWithBenefits/friendpage/friendpage.component';
import { NavBarv2Component } from './components/Misc/nav-barv2/nav-barv2.component';
import { GroupHomeComponent } from './components/group/group-home/group-home.component';
import { GroupSelectComponent } from './components/group/group-select/group-select.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate:[AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  { path: 'fullPost/:id', component: FullPostComponent, canActivate:[AuthGuard]},
  { path: 'friendrequests', component: FriendrequestsComponent, canActivate:[AuthGuard]},
  { path: 'visitingProfil/:id', component: VisitingProfilComponent, canActivate:[AuthGuard]},
  { path: 'friendpage', component: FriendpageComponent, canActivate:[AuthGuard]},
  { path: 'navbar', component: NavBarv2Component},
  { path: 'groupHome/:id', component: GroupHomeComponent, canActivate:[AuthGuard]},
  { path: 'groupSelect', component: GroupSelectComponent, canActivate:[AuthGuard]},
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
