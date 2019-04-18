import {TestBed} from '@angular/core/testing';
import {StoreService} from './store.service';

let service;

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getPlaylist() method', () => {
    expect(service.getPlaylist).toBeDefined();
  });

  it('should have addVideoToPlaylist() method', () => {
    expect(service.addVideoToPlaylist).toBeDefined();
  });

  it('should have createPlaylist() method', () => {
    expect(service.createPlaylist).toBeDefined();
  });
});
