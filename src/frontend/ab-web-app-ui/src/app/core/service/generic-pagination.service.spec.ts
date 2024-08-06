import { TestBed } from '@angular/core/testing';

import { GenericPaginationService } from './generic-pagination.service';

describe('GenericPaginationService', () => {
  let service: GenericPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
