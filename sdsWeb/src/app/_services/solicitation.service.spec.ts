import { TestBed } from '@angular/core/testing';

import { SolicitationService } from './solicitation.service';

describe('SolicitationService', () => {
  let service: SolicitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
