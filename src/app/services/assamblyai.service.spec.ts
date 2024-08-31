import { TestBed } from '@angular/core/testing';

import { AssamblyaiService } from './assamblyai.service';

describe('AssamblyaiService', () => {
  let service: AssamblyaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssamblyaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
