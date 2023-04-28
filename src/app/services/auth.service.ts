import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/loginrequest';
import { RegisterRequest } from '../models/registerrequest';

const httpOptions={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }


  register(register: RegisterRequest): Observable<RegisterRequest>{
    return this.http.post<RegisterRequest>(this.baseApiUrl + 'users/register', register, httpOptions)
  }

  login(login: LoginRequest): Observable<LoginRequest>{
    return this.http.post<LoginRequest>(this.baseApiUrl + 'users/login', login, httpOptions);
  }
}
