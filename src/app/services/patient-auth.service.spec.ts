import { TestBed } from '@angular/core/testing';

import { PatientAuthService } from './patient-auth.service';

describe('PatientAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientAuthService = TestBed.get(PatientAuthService);
    expect(service).toBeTruthy();
  });
});
