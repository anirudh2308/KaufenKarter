import { TestBed } from '@angular/core/testing';

import { UpdateselectedprodService } from './updateselectedprod.service';

describe('UpdateselectedprodService', () => {
  let service: UpdateselectedprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateselectedprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
