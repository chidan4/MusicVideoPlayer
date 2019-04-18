import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GeneratePlaylistComponent } from './generate-playlist.component';
import { StoreService} from '../../../../services/store.service';
import {Playlist} from '../../../../services/models/playlist.interface';
import {BehaviorSubject} from 'rxjs';

describe('GeneratePlaylistComponent', () => {
  let component: GeneratePlaylistComponent;
  let fixture: ComponentFixture<GeneratePlaylistComponent>;
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
    createPlaylist(name: string) {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePlaylistComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {provide: StoreService, useClass: MockStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCreatePlaylist to set the name to null and emit', () => {
    component.playListName = 'My PlayList';
    spyOn(component.playListAdded, 'emit');
    component.onCreatePlaylist();
    expect(component.playListName).toBe('');
    expect(component.playListAdded.emit).toHaveBeenCalled();
  });
});
