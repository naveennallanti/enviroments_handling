import { TestBed } from '@angular/core/testing';

import { App.ServiceService } from './app.service.service';

describe('App.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: App.ServiceService = TestBed.get(App.ServiceService);
    expect(service).toBeTruthy();
  });
});
