import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SettingsComponent } from './components/setting/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { FullPostComponent } from './components/feeds/full-post/full-post.component';
import { VisitingProfilComponent } from './components/visiting-profil/visiting-profil.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { FriendrequestsComponent } from './components/friendrequests/friendrequests.component';

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
  { path: 'visitingProfil/:id', component: VisitingProfilComponent, canActivate:[AuthGuard] }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
