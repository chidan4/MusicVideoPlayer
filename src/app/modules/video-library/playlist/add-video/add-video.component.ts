import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from '../../../../services/models/playlist.interface';
import {StoreService} from '../../../../services/store.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {
@Input() currentPlaylist: Playlist[];
public showAddVideoForm: boolean;
form = this.fb.group({
    playList: this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      url: ['', Validators.required]
    })
  });
  constructor(private storeService: StoreService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.showAddVideoForm = false;
  }

  addVideoToCurrentPlaylist(): void {
    this.showAddVideoForm = true;
  }
  /**
   * @description onSubmit adds video to the current playlist
   * @params NA
   */
  onSubmit(): void {
    this.showAddVideoForm = false;
    this.storeService.addVideoToPlaylist(this.currentPlaylist[0].id, this.form.controls.playList.value);
    this.form.reset();
  }
}
