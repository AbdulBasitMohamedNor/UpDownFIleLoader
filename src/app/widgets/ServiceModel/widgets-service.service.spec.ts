import { TestBed } from '@angular/core/testing';

import { WidgetsServiceService } from './widgets-service.service';

describe('WidgetsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidgetsServiceService = TestBed.get(WidgetsServiceService);
    expect(service).toBeTruthy();
  });
});
