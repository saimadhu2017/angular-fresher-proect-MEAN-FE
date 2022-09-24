import { TestBed } from '@angular/core/testing';

import { IsNotSignedInService } from './is-not-signed-in.service';

describe('IsNotSignedInService', () => {
  let service: IsNotSignedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsNotSignedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
