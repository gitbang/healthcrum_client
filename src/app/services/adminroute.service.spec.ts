import { TestBed } from '@angular/core/testing';

import { AdminrouteService } from './adminroute.service';

describe('AdminrouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminrouteService = TestBed.get(AdminrouteService);
    expect(service).toBeTruthy();
  });
});
