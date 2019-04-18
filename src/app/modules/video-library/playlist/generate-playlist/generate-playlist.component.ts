import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { StoreService} from '../../../../services/store.service';

@Component({
  selector: 'app-generate-playlist',
  templateUrl: './generate-playlist.component.html',
  styleUrls: ['./generate-playlist.component.css']
})
export class GeneratePlaylistComponent implements OnInit {
  @Output() playListAdded = new EventEmitter();
  public playListName = '';
  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  onCreatePlaylist(): void {
    this.storeService.createPlaylist(this.playListName);
    this.playListName = '';
    this.playListAdded.emit(null);
  }
}
