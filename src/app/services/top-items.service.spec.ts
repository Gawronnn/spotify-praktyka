import { TestBed } from '@angular/core/testing';

import { TopItemsService } from './top-items.service';

describe('TopItemsService', () => {
  let service: TopItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
