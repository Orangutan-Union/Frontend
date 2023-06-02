import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ChangeEmailDisplaynameComponent } from './components/change-email-displayname/change-email-displayname.component';
import { SettingsComponent } from './components/setting/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { FullPostComponent } from './components/feeds/full-post/full-post.component';
import { FriendrequestsComponent } from './components/friendrequests/friendrequests.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate:[AuthGuard] },
  { path: 'changeDisplay', component: ChangeEmailDisplaynameComponent, canActivate:[AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  { path: 'fullPost/:id', component: FullPostComponent, canActivate:[AuthGuard]},
  { path: 'friendrequests', component: FriendrequestsComponent, canActivate:[AuthGuard]},
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
