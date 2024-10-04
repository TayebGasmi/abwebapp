import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileCompletedGuard } from './profile-completed.guard';

describe('profileCompletedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profileCompletedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
