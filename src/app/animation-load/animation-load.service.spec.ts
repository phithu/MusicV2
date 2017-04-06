import { TestBed, inject } from '@angular/core/testing';

import { AnimationLoadService } from './animation-load.service';

describe('AnimationLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationLoadService]
    });
  });

  it('should ...', inject([AnimationLoadService], (service: AnimationLoadService) => {
    expect(service).toBeTruthy();
  }));
});
