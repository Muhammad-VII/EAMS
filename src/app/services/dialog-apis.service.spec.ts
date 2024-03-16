import { TestBed } from '@angular/core/testing';

import { DialogApisService } from './dialog-apis.service';

describe('DialogApisService', () => {
  let service: DialogApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
