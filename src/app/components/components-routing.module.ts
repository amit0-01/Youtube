import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayPlaylistComponent } from './home/play-playlist/play-playlist.component';
import { PlayVideoComponent } from './home/play-video/play-video.component';
import { PlaylistComponent } from './home/playlist/playlist.component';
import { YoutubeHomeComponent } from './home/youtube-home/youtube-home.component';

const routes: Routes = [
  {
    path: "",
    component: YoutubeHomeComponent,
  },
  {
    path: "youtube-home",
    component: YoutubeHomeComponent
  },
  {
    path: 'play-video',
    component: PlayVideoComponent
  },
  {
    path: 'playlist',
    component: PlaylistComponent
  },
  {
    path: 'play-playlist',
    component: PlayPlaylistComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
