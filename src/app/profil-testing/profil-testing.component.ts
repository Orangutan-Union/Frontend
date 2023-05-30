import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profil-testing',
  templateUrl: './profil-testing.component.html',
  styleUrls: ['./profil-testing.component.css']
})
export class ProfilTestingComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ProfilTestingComponent>) { }

  ngOnInit(): void {
  }

}
