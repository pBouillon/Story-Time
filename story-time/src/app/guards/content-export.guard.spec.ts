import { TestBed, async, inject } from '@angular/core/testing';

import { ContentExportGuard } from './content-export.guard';

describe('ContentExportGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentExportGuard]
    });
  });

  it('should ...', inject([ContentExportGuard], (guard: ContentExportGuard) => {
    expect(guard).toBeTruthy();
  }));
});
