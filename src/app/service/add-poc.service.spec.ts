import { TestBed } from '@angular/core/testing';

import { AddPocService } from './add-poc.service';

describe('AddPocService', () => {
  let service: AddPocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
