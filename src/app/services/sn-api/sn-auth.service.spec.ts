import { TestBed } from '@angular/core/testing';

import { SnAuthService } from './sn-auth.service';

describe('SnAuthService', () => {
  let service: SnAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
