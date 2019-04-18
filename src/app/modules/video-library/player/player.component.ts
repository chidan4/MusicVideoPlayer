import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {StoreService} from '../../../services/store.service';
import {PlayerService} from '../../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('mediaPlayer') videoPlayer: ElementRef;

  public videoStore = [];
  public videoIndex = 0;
  public selectedPlaylistId = 1;

  constructor(private storeService: StoreService,
              private renderer: Renderer2,
              private playerService: PlayerService) {
  }

  /**
   * @description initializes all subscriptions and initiates to play the first video of the default playlist
   * @params NA
   */
  ngOnInit() {

    this.storeService.playlist.subscribe(() => {
      this.videoStore = this.storeService.getPlaylist(this.selectedPlaylistId)[0].list;
    });

    this.renderer.listen(this.videoPlayer.nativeElement, 'ended', () => {
      this.getNextVideo();
    });

    this.playerService.playSelectedPlaylistSubject.subscribe(selectedPlaylistId => {
      if (selectedPlaylistId) {
        this.playNextVideoFromThePlaylist(selectedPlaylistId);
      }
    });

    this.playerService.videoToPlaySubject.subscribe((videoObj) => {
      if (videoObj && videoObj.videoUrl) {
        this.videoIndex = videoObj.videoIndex;
        this.playVideo(videoObj.videoUrl);
      }
    });
  }

  /**
   * @description playNextVideoFromThePlaylist gets all the videos from the selected playlist and starts playing first video
   * @params selected playlist id <number>
   */
  playNextVideoFromThePlaylist(selectedPlaylistId: number) {
    this.selectedPlaylistId = selectedPlaylistId;
    this.videoStore = this.storeService.getPlaylist(selectedPlaylistId)[0].list;
    if (this.videoStore.length !== 0) {
      this.getNextVideo();
    }
  }

  /**
   * @description getNextVideo sets the next video index to play and maintains circular behaviour of playing the videos
   * @params selected playlist id <number>
   */
  getNextVideo() {
    if (this.videoStore.length > 0) {
      this.videoIndex = (this.videoIndex + 1) % this.videoStore.length;
      this.playVideo(this.videoStore[this.videoIndex].url);
    }
  }

  /**
   * @description playVideo play's first video
   * @params video source url <number>
   */
  playVideo(url: string) {
    this.videoPlayer.nativeElement.src = url;
    this.videoPlayer.nativeElement.play();
  }
}
