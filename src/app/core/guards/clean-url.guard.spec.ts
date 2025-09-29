import { TestBed } from '@angular/core/testing';

import { CleanUrlGuard } from './clean-url.guard';

describe('CleanUrlGuard', () => {
  let guard: CleanUrlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CleanUrlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
