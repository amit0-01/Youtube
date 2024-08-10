import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YoutubehomeService } from 'src/app/common/services/youtubehome.service';

@Component({
  selector: 'app-add-to-playlist',
  templateUrl: './add-to-playlist.component.html',
  styleUrls: ['./add-to-playlist.component.scss']
})
export class AddToPlaylistComponent {
  playlists: { name: string; description: string }[] = [];
  playlistName: string = '';
  playlistDescription: string = '';
  token: any
  userId: any
  userPlaylist: any
  showFormforCreateList: boolean = false
  constructor(private service: YoutubehomeService,
    @Inject(MAT_DIALOG_DATA) public matData:any

    ){
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
        console.log(this.userPlaylist);
        
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  }
  // show playlist 
  showPlaylistForm() {
    this.showFormforCreateList = true
  }

  // add playlist
  addPlaylist() {
    this.service.addPlaylist(this.playlistName, this.playlistDescription, this.token).subscribe((res:any)=>{
      if(res.success){
        this.getPlaylist();
      }
      
      this.playlistName = '';
      this.playlistDescription = '';
      this.showFormforCreateList = false
    })
  }

  onCheckboxChange(playlist: any, event: any) {
    console.log('playlist', playlist);
    console.log('event', event);
    const obj ={
      playlistId: playlist._id,
      videoId: this.matData,
      token: this.token
    }
    if(event.checked){
    this.service.addVideotoPlaylist(obj).subscribe((res:any)=>{
      if(res.success){
        alert(res.message)
      }  
    })
  }
  else if(!event.checked){
    this.service.removeVideofromPlaylist(obj).subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        alert(res.message)
      }
      
    })
  }
    
  }

  // check if video is already there in the playlist
  isVideoInPlaylist(playlist: any): boolean {
    return playlist.videos.some((video: any) => video._id === this.matData);
  }

}
