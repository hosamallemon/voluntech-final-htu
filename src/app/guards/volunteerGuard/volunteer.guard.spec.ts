import { TestBed } from '@angular/core/testing';

import { VolunteerGuard } from './volunteer.guard';

describe('VolunterGuard', () => {
  let guard: VolunteerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VolunteerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
