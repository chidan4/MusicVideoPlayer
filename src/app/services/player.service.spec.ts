import {TestBed} from '@angular/core/testing';
import { PlayerService} from './player.service';

let service;
describe('PlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have playSelectedVideo() method', () => {
    expect(service.playSelectedVideo).toBeDefined();
  });

  it('should have playSelectedPlaylist() method', () => {
    expect(service.playSelectedPlaylist).toBeDefined();
  });
});
