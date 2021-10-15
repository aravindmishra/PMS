import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDetailsListComponent } from './medicine-details-list.component';

describe('MedicineDetailsListComponent', () => {
  let component: MedicineDetailsListComponent;
  let fixture: ComponentFixture<MedicineDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
