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
  }

  ngAfterViewInit(){
    window.onmousedown = evt =>{
      if ((<Element>evt.target).id === "imgModal"){
        this.closeModal()
      }
    }
  }

  slideIndex = 0;

  openModal() {
    document.getElementById('imgModal')!.style.display = "flex";
   }
   closeModal() {
    document.getElementById('imgModal')!.style.display = "none";
   }
   plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
   }
   currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
   }
  //  showSlides(slideIndex: number);
   showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf < HTMLElement > ;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf < HTMLElement > ;
    if (n > slides.length) {
     this.slideIndex = 1
    }
    if (n < 1) {
     this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
     dots[this.slideIndex - 1].className += " active";
    }
  }

}
