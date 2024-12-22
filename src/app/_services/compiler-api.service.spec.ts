import { TestBed } from '@angular/core/testing';

import { CompilerApiService } from './compiler-api.service';

describe('CompilerApiService', () => {
  let service: CompilerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompilerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
