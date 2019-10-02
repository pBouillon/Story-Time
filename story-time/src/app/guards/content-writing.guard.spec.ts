import { TestBed, async, inject } from '@angular/core/testing';

import { ContentWritingGuard } from './content-writing.guard';

describe('ContentWritingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentWritingGuard]
    });
  });

  it('should ...', inject([ContentWritingGuard], (guard: ContentWritingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
