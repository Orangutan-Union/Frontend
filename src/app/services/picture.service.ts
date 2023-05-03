import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  addPicture(formData: FormData){
    return this.http.post(this.baseApiUrl + 'pictures/', formData);
  }
}
