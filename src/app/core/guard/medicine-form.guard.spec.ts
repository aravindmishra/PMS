import { TestBed } from '@angular/core/testing';

import { MedicineFormGuard } from './medicine-form.guard';

describe('MedicineFormGuard', () => {
  let guard: MedicineFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedicineFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
