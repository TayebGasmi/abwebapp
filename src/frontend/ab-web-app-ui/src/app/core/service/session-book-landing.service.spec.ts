import { TestBed } from '@angular/core/testing';

import { SessionBookLandingService } from './session-book-landing.service';

describe('SessionBookLandingService', () => {
  let service: SessionBookLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionBookLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
