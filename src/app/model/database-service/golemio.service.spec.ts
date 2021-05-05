import { TestBed } from '@angular/core/testing';

import { GolemioService } from './golemio.service';

describe('GolemioService', () => {
  let service: GolemioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GolemioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
