import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public videoToPlaySubject = new BehaviorSubject(null);
  public playSelectedPlaylistSubject = new BehaviorSubject(null);
  constructor() {}

  /**
   * @description playSelectedVideo pushes the video url immediately to videoToPLay subject
   * @params videoUrl<string>, videoIndex<number>
   */
  playSelectedVideo(url: string, index: number) {
    this.videoToPlaySubject.next({videoUrl: url, videoIndex: index});
  }
  /**
   * @description playSelectedPlaylist pushes the playlist immediately to playSelectedPlaylistSubject
   * @params playlistID <number>
   */
  playSelectedPlaylist(playlistId: number) {
    this.playSelectedPlaylistSubject.next(playlistId);
  }
}
