import { TestBed, inject } from '@angular/core/testing';

import { ShareDataService } from './share-data.service';

describe('ShareDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareDataService]
    });
  });

  it('should ...', inject([ShareDataService], (service: ShareDataService) => {
    expect(service).toBeTruthy();
  }));
});
