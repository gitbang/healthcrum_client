import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInventryComponent } from './equipment-inventry.component';

describe('EquipmentInventryComponent', () => {
  let component: EquipmentInventryComponent;
  let fixture: ComponentFixture<EquipmentInventryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentInventryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentInventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
