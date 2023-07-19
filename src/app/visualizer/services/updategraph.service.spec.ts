import { TestBed } from '@angular/core/testing';

import { UpdategraphService } from './updategraph.service';

describe('UpdategraphService', () => {
  let service: UpdategraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdategraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
