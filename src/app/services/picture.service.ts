import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Picture } from '../models/picture';

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

  updateNavbarPicture(pictureUrl: string){    
    this.updatedPicture.emit(pictureUrl);
  }

  updatePreviewPictures(pictures: Picture[]){
    this.previewPictures.emit(pictures);
  }
}
