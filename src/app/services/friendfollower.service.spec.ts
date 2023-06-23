import { TestBed } from '@angular/core/testing';

import { FriendfollowerService } from './friendfollower.service';

describe('FriendfollowerService', () => {
  let service: FriendfollowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendfollowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
