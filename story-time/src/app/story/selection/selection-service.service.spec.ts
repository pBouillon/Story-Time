import { TestBed } from '@angular/core/testing';

import { SelectionServiceService } from './selection-service.service';

describe('SelectionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectionServiceService = TestBed.get(SelectionServiceService);
    expect(service).toBeTruthy();
  });
});
