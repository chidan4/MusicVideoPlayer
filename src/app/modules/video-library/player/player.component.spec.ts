import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService} from '../../../services/store.service';
import { PlayerComponent } from './player.component';
import { Playlist } from '../../../services/models/playlist.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let storeService: StoreService;
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
      declarations: [ PlayerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: StoreService, useClass: MockStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    storeService = TestBed.get(StoreService);
    fixture.detectChanges();
  });

  it('playNextVideoFromThePlaylist, should get playlist', () => {
    spyOn(storeService, 'getPlaylist').and.returnValue([playListObj]);
    component.playNextVideoFromThePlaylist(1);
    expect(component.videoStore.length).toBeGreaterThan(0);
  });

  it('getNextVideo should set video index playvideo', () => {
    component.videoStore = playListObj.list;
    component.getNextVideo();
    expect(component.videoIndex).toBe(0);
  });

  it('playVideo should set the src and play', () => {
    const app = fixture.debugElement.nativeElement;
    component.playVideo(playListObj.list[0].url);
    expect(component.videoPlayer.nativeElement.src).toBe(playListObj.list[0].url);
  });
});
