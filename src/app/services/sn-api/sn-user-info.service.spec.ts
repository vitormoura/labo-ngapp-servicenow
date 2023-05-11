import { TestBed } from '@angular/core/testing';

import { SnUserInfoService } from './sn-user-info.service';

describe('SnUserInfoService', () => {
  let service: SnUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
