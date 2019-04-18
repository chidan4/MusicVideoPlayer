import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './modules/video-library/player/player.component';
import { PlaylistComponent } from './modules/video-library/playlist/playlist.component';
import { AddVideoComponent } from './modules/video-library/playlist/add-video/add-video.component';
import { GeneratePlaylistComponent } from './modules/video-library/playlist/generate-playlist/generate-playlist.component';

import { StoreService} from './services/store.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlaylistComponent,
    AddVideoComponent,
    GeneratePlaylistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
