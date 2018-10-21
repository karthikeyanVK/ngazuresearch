import { TestBed } from '@angular/core/testing';

import { AzsearchService } from './azsearch.service';

describe('AzsearchServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AzsearchService = TestBed.get(AzsearchService);
    expect(service).toBeTruthy();
  });
});
