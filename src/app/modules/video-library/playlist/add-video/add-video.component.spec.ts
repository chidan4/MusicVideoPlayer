import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { AddVideoComponent } from './add-video.component';
import { StoreService} from '../../../../services/store.service';
import {BehaviorSubject} from 'rxjs';
import {Playlist} from '../../../../services/models/playlist.interface';
import {FormBuilder} from '@angular/forms';
describe('AddVideoComponent', () => {
  let component: AddVideoComponent;
  let fixture: ComponentFixture<AddVideoComponent>;
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
    addVideoToPlaylist(id: number, value: Playlist) {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVideoComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        {provide: StoreService, useClass: MockStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addVideoToCurrentPlaylist to set showAddVideoForm to true', () => {
    component.showAddVideoForm = false;
    component.addVideoToCurrentPlaylist();
    expect(component.showAddVideoForm).toBe(true);
  });

  it('onSubmit to set showAddVideoForm to false', () => {
    component.form.patchValue({
      title: 'Rummy',
      artist: 'Circle',
      url: 'http://techslides.com/demos/sample-videos/small.mp4',
      playlist: 'My Playlist'
    });
    component.currentPlaylist = [playListObj];
    component.showAddVideoForm = true;
    component.onSubmit();
    expect(component.showAddVideoForm).toBe(false);
  });
});
