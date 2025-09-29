import { TestBed } from '@angular/core/testing';

import { ApiTableConfigService } from './api-table-config.service';

describe('ApiTableConfigService', () => {
  let service: ApiTableConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTableConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
