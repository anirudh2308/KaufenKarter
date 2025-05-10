import { TestBed } from '@angular/core/testing';

import { UpdateprodService } from './updateprod.service';

describe('UpdateprodService', () => {
  let service: UpdateprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
