import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCheckupComponent } from './patient-checkup.component';

describe('PatientCheckupComponent', () => {
  let component: PatientCheckupComponent;
  let fixture: ComponentFixture<PatientCheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
