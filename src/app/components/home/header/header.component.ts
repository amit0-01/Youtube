import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadVideoComponent } from '../upload-video/upload-video.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog){}


  uploadVideo(){
    this.dialog.open(UploadVideoComponent)
  }

  logout(){

  }
}
