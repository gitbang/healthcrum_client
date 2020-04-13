import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEquipmentComponent } from './single-equipment.component';

describe('SingleEquipmentComponent', () => {
  let component: SingleEquipmentComponent;
  let fixture: ComponentFixture<SingleEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
