import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  @Output() updatedPicture: EventEmitter<string> = new EventEmitter();

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  addPicture(formData: FormData){
    return this.http.post(this.baseApiUrl + 'pictures/', formData);
  }

  updateNavbarPicture(pictureUrl: string){
    console.log('FROM SERVICE BELOW');
    
    console.log(pictureUrl);
    
    this.updatedPicture.emit(pictureUrl);
  }
}
