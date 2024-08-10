import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeAgoPipe } from 'src/app/common/pipes/timeago.pipe';
import { YoutubehomeService } from 'src/app/common/services/youtubehome.service';
@Component({
  selector: 'app-youtube-home',
  templateUrl: './youtube-home.component.html',
  styleUrls: ['./youtube-home.component.scss']
})
export class YoutubeHomeComponent implements OnInit{
  userId: any;
  token: any;
  links: string[] = [];
  videoId: any;
  comingData:any;
  constructor(private homeService: YoutubehomeService,
    private router: Router) {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);

      // Check if userData has _id property
      if (userData && userData.user && userData.user._id) {
        this.userId = userData.user._id;
        this.token = userData.accessToken;
      } else {
        console.log('Invalid userData format: missing user._id');
      }
    }
  }

  ngOnInit(): void {
    this.homeService.getAllVideos(this.userId, this.token).subscribe((res: any) => {
      this.videoId = JSON.stringify(res);
      this.comingData = res.data;
      console.log(this.comingData);

      this.links = res.data.map((element: any) => element.videoFile);
    });
  }

  gotoplayVideo(Data:any){
    console.log(Data);
    this.router.navigate(['home/play-video'], {queryParams: {videoFile:Data.videoFile, videoId: Data._id, user: Data.owner}});
  }
}


