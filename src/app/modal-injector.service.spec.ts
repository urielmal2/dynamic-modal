import { TestBed } from '@angular/core/testing';

import { ModalInjectorService } from './modal-injector.service';

describe('ModalInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalInjectorService = TestBed.get(ModalInjectorService);
    expect(service).toBeTruthy();
  });
});
