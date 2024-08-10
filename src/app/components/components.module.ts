import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { YoutubeHomeComponent } from './home/youtube-home/youtube-home.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { UploadVideoComponent } from './home/upload-video/upload-video.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { PlayVideoComponent } from './home/play-video/play-video.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PlaylistComponent } from './home/playlist/playlist.component';
import { AddToPlaylistComponent } from './home/add-to-playlist/add-to-playlist.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PlayPlaylistComponent } from './home/play-playlist/play-playlist.component';
import { TimeAgoPipe } from '../common/pipes/timeago.pipe';





@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    YoutubeHomeComponent,
    SidenavComponent,
    UploadVideoComponent,
    PlayVideoComponent,
    PlaylistComponent,
    AddToPlaylistComponent,
    PlayPlaylistComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    RouterOutlet,
    RouterLink,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ComponentsModule { }
