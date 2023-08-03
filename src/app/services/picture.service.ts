import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Picture } from '../models/picture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  @Output() previewPictures: EventEmitter<Picture[]> = new EventEmitter();
  @Output() updatedPicture: EventEmitter<string> = new EventEmitter();

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  addPicture(formData: FormData){
    return this.http.post(this.baseApiUrl + 'pictures/', formData);
  }

  getUserPostsPictures(id: number):Observable<Picture[]>{
    return this.http.get<Picture[]>(this.baseApiUrl + 'pictures/user/' + id);
  }

  updateNavbarPicture(pictureUrl: string){    
    this.updatedPicture.emit(pictureUrl);
  }

  updatePreviewPictures(pictures: Picture[]){
    this.previewPictures.emit(pictures);
  }
}
