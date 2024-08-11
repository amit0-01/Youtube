import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { YoutubehomeService } from 'src/app/common/services/youtubehome.service';
import { UploadVideoComponent } from '../upload-video/upload-video.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  token: any
  constructor(
    private dialog: MatDialog,
    private service: YoutubehomeService,
    private router: Router
    ){
      const userDataString = localStorage.getItem('userData');

      if (userDataString !== null) {
        const userData = JSON.parse(userDataString);
  
        // Check if userData has _id property
        if (userData && userData.user && userData.user._id) {
          // this.userId = userData.user._id;
          this.token = userData.accessToken;
        } else {
          console.log('Invalid userData format: missing user._id');
        }
      }
    }


  uploadVideo(){
    this.dialog.open(UploadVideoComponent)
  }

  logout(){
    this.service.logout(this.token).subscribe((res:any)=>{
      localStorage.clear()
      this.router.navigate([""])
    })

  }
}
