import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistotyComponent } from './purchase-histoty.component';

describe('PurchaseHistotyComponent', () => {
  let component: PurchaseHistotyComponent;
  let fixture: ComponentFixture<PurchaseHistotyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseHistotyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHistotyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
