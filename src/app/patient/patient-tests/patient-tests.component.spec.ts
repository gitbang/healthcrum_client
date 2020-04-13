import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTestsComponent } from './patient-tests.component';

describe('PatientTestsComponent', () => {
  let component: PatientTestsComponent;
  let fixture: ComponentFixture<PatientTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
