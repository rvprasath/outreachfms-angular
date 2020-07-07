import { TestBed } from '@angular/core/testing';

import { AddPmoService } from './add-pmo.service';

describe('AddPmoService', () => {
  let service: AddPmoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPmoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
