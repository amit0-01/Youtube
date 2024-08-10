import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubehomeService } from 'src/app/common/services/youtubehome.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  playlists: { name: string; description: string }[] = [];
  playlistName: string = '';
  playlistDescription: string = '';
  token: any
  userId: any
  userPlaylist: any

  constructor(private service: YoutubehomeService, private router: Router){
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

  ngOnInit(){
    this.getPlaylist( )
  }

  async getPlaylist() {
    try {
      const res = await this.service.getPlaylist(this.token, this.userId).toPromise();
      if(res.success){
        this.userPlaylist = res.data
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  }

  addPlaylist() {
    this.service.addPlaylist(this.playlistName, this.playlistDescription, this.token).subscribe((res:any)=>{
      if(res.success){
        this.getPlaylist();
      }
      
      this.playlistName = '';
      this.playlistDescription = '';
    })
  }

  // get individual playlist
  getIndividualPlaylist(playlist: any) {
    console.log(playlist);
  
    // Navigate to the 'play-playlist' route with query parameters
    this.router.navigate(['home/play-playlist'], {
      queryParams: { id: playlist._id } // Assuming playlist has an 'id' property
    });
  }
  

}