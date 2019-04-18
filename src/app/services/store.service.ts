import {BehaviorSubject} from 'rxjs';
import {Playlist, Video} from './models/playlist.interface';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor() {}
  private initialValue: Playlist[] = [
    {
      id: 1,
      name: 'My First Playlist',
      list: [{
        title: 'Pop',
        artist: 'Micheal',
        url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      },
        {
          title: 'Hit me Baby',
          artist: 'Britney',
          url: 'http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.m4v'
        }]
    }
  ];

  public playlist = new BehaviorSubject<Playlist[]>(this.initialValue);

  /**
   * @description getter for all playlist
   * @params NA
   */
  get playList(): Playlist[] {
    return this.playlist.value;
  }

  /**
   * @description returns a playlist with id
   * @params playListId<number>
   */
  getPlaylist(playlistId: number) {
    return this.playList.filter(playList => playList.id === playlistId);
  }

  /**
   * @description addVideoToPlaylist adds video to a playlist based on playlist id
   * @params playListId<number>, video<Video>
   */
  addVideoToPlaylist(playListId: number, video: Video) {
    const selectedPlaylist = this.playList.find((playlist: Playlist) => playlist.id === playListId);
    selectedPlaylist.list = [...selectedPlaylist.list, video];
    const storeValue = [...this.playList, selectedPlaylist];
    this.playlist.next(storeValue);
  }

  /**
   * @description createPlaylist adds a new playlist to array and pushes to behaviour subject to synchronize uddates
   * and creates new id
   * @params playListName<string>
   */
  createPlaylist(playlistName: string) {
    const newId = Math.max(...this.playList.map(playlist => playlist.id)) + 1;
    const newPlaylist: Playlist = {
      id: newId,
      name: playlistName,
      list: []
    };
    const storeValue = [...this.playList, newPlaylist];
    this.playlist.next(storeValue);
  }
}
