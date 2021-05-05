import { TestBed } from '@angular/core/testing';

import { LayerControllerService } from './layer-controller.service';

describe('LayerControllerService', () => {
  let service: LayerControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayerControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
