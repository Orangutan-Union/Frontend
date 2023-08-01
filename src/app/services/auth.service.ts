import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/loginrequest';
import { RegisterRequest } from '../models/registerrequest';
import { User } from '../models/user';
import { ChangePassword } from '../models/changepassword';
import { AuthenticatedResponse } from '../models/authenticatedresponse';
import { Router } from '@angular/router';

const httpOptions={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() showNavbar: EventEmitter<boolean> = new EventEmitter();

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private route: Router) { }

  displayNavbar(show: boolean){
    this.showNavbar.emit(show);
  }

  

  register(register: RegisterRequest): Observable<RegisterRequest>{
    return this.http.post<RegisterRequest>(this.baseApiUrl + 'users/register', register, httpOptions)
  }

  login(login: LoginRequest): Observable<AuthenticatedResponse>{
    return this.http.post<AuthenticatedResponse>(this.baseApiUrl + 'users/login', login, httpOptions);
  }

  uploadImage(id: number, formData: FormData): Observable<User>{
    return this.http.put<User>(this.baseApiUrl + 'users/' + id + '/uploadimage', formData);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(this.baseApiUrl + 'users/' + id);
  }

  getUsersBySearch(query: string): Observable<User[]>{
    return this.http.get<User[]>(this.baseApiUrl + 'users/search/' + query);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(this.baseApiUrl + 'users/update/' + user.userId, user);
  }

  changePassword(password: ChangePassword): Observable<boolean>{
    return this.http.put<boolean>(this.baseApiUrl + 'users/changepassword', password);
  }


  getToken(){
    return localStorage.getItem('jwt');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  storeToken(tokenValue: string){
    localStorage.setItem('jwt', tokenValue);
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue);
  }

  renewToken(auth: AuthenticatedResponse){
    return this.http.post<any>(this.baseApiUrl + "users/refresh", auth, httpOptions)
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem("jwt");
  }

  logout(){
    localStorage.clear();
    this.displayNavbar(false);
    this.route.navigate(['/login'])
  }
}
