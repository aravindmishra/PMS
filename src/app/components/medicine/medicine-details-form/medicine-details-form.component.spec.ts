import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDetailsFormComponent } from './medicine-details-form.component';

describe('MedicineDetailsFormComponent', () => {
  let component: MedicineDetailsFormComponent;
  let fixture: ComponentFixture<MedicineDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
