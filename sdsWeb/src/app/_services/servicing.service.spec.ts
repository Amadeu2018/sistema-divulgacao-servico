import { TestBed } from '@angular/core/testing';

import { ServicingService } from './servicing.service';

describe('ServicingService', () => {
  let service: ServicingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
