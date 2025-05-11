import { TestBed } from '@angular/core/testing';

import { OfficeSpaceService } from './office-space.service';

describe('OfficeSpaceService', () => {
  let service: OfficeSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
