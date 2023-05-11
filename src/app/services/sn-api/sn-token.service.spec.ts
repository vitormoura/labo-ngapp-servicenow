import { TestBed } from '@angular/core/testing';

import { SnTokenService } from './sn-token.service';

describe('SnTokenService', () => {
  let service: SnTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
