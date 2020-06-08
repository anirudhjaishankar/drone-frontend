import { TestBed } from '@angular/core/testing';

import { DroneroutesService } from './droneroutes.service';

describe('DroneroutesService', () => {
  let service: DroneroutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneroutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
