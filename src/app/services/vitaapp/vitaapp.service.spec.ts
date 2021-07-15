import { TestBed } from '@angular/core/testing';

import { VitaappService } from './vitaapp.service';

describe('VitaappService', () => {
  let service: VitaappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitaappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
