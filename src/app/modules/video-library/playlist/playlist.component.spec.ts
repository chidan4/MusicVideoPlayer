import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { PlaylistComponent } from './playlist.component';
import { Playlist } from '../../../services/models/playlist.interface';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from '../../../services/store.service';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;
  const playListObj: Playlist = {
    id: 1,
    name: 'My Play List',
    list: [{
      title: 'Sample',
      artist: 'Michael',
      url: 'http://techslides.com/demos/sample-videos/small.mp4'
    }]
  };
  class MockStoreService {
    playlist = new BehaviorSubject<Playlist[]>([playListObj]);
    getPlaylist() {
      return [playListObj];
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: StoreService, useClass: MockStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showVideoFromPlayList expected to set the playlist and call playSelectedPlayList', () =>{
    spyOn(component, 'playSelectedPlayList').and.callThrough();
    component.showVideoFromPlayList(1);
    expect(component.playList).toEqual([playListObj]);
    expect(component.playSelectedPlayList).toHaveBeenCalled();
  });
});
