import { TestBed } from '@angular/core/testing';

import { JSONPlaceholderClientService } from './jsonplaceholder-client.service';

describe('JSONPlaceholderClientService', () => {
  let service: JSONPlaceholderClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONPlaceholderClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
