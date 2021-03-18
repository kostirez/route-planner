import { TestBed } from '@angular/core/testing';

import { OlFuncService } from './ol-func.service';

describe('OlFuncService', () => {
  let service: OlFuncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlFuncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
