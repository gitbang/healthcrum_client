import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentPurchaseComponent } from './equipment-purchase.component';

describe('EquipmentPurchaseComponent', () => {
  let component: EquipmentPurchaseComponent;
  let fixture: ComponentFixture<EquipmentPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
