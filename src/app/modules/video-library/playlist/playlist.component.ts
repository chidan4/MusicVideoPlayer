import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../../services/store.service';
import {Playlist, Video} from '../../../services/models/playlist.interface';
import {PlayerService} from '../../../services/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  public listOfPlaylist: Playlist[];
  public playList = {};
  public selectedPlaylistId: number;

  constructor(private storeService: StoreService,
              private playerService: PlayerService) {
  }
  /**
   * @description initializes to show the default playlist
   * @params NA
   */
  ngOnInit() {
    this.updatePlayList();
    this.showVideoFromPlayList(1);
  }
  /**
   * @description showVideoFromPlayList shows all the videos from the current playlist
   * @params selected playlist id <number>
   */
  showVideoFromPlayList(playListId: number): void {
    this.playList = (this.storeService.getPlaylist(playListId));
    this.playSelectedPlayList(playListId);
  }
  /**
   * @description updatePlayList updates current playlist when new video gets added
   * @params NA
   */
  updatePlayList(): void {
    this.listOfPlaylist = this.storeService.playList;
  }
  /**
   * @description playSelectedVideo invokes playerservice playselect video method
   * @params videoUrl<string>, videoIndex <number>
   */
  playSelectedVideo(url: string, index: number): void {
    this.playerService.playSelectedVideo(url, index);
  }
  /**
   * @description playSelectedPlayList invokes playerservice playSelectedPlaylist video method
   * @params playlistId <number>
   */
  playSelectedPlayList(playlistId) {
    this.selectedPlaylistId = playlistId;
    this.playerService.playSelectedPlaylist(playlistId);
  }
}
