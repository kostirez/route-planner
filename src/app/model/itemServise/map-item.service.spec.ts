import { TestBed } from '@angular/core/testing';

import { MapItemService } from './map-item.service';

describe('MapItemService', () => {
  let service: MapItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
