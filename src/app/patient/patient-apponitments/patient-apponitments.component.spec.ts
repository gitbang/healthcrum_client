import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientApponitmentsComponent } from './patient-apponitments.component';

describe('PatientApponitmentsComponent', () => {
  let component: PatientApponitmentsComponent;
  let fixture: ComponentFixture<PatientApponitmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientApponitmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientApponitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
