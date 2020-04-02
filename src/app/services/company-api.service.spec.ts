import { TestBed } from '@angular/core/testing';

import { CompanyApiService } from './company-api.service';

describe('CompanyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyApiService = TestBed.get(CompanyApiService);
    expect(service).toBeTruthy();
  });
});
