import { TestBed } from '@angular/core/testing';

import { SharedproductserviceService } from './sharedproductservice.service';

describe('SharedproductserviceService', () => {
  let service: SharedproductserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedproductserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
