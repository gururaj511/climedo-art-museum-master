import { TestBed } from '@angular/core/testing';

import { ArtMuseumService } from './art-museum.service';

describe('ArtMuseumService', () => {
  let service: ArtMuseumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtMuseumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
