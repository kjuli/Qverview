import { TestBed } from '@angular/core/testing';

import { SplashscreenStateService } from './splashscreen-state.service';

describe('SplashscreenStateService', () => {
  let service: SplashscreenStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplashscreenStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
