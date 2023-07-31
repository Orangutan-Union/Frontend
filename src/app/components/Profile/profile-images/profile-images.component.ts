import { Component, Input, OnInit } from '@angular/core';
import { Picture } from 'src/app/models/picture';

@Component({
  selector: 'app-profile-images',
  templateUrl: './profile-images.component.html',
  styleUrls: ['./profile-images.component.css']
})
export class ProfileImagesComponent implements OnInit {

  @Input() pictures: Picture[] = [];
  previewPictures: Picture[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log('before',this.pictures);
    
    if (this.pictures.length > 4) {
      this.previewPictures = this.pictures.slice(0, 4);      
    }
    else{
      this.previewPictures = this.pictures;
    }
    console.log('preview',this.previewPictures);
    
  }

}
