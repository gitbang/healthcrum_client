import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPerscriptionComponent } from './patient-perscription.component';

describe('PatientPerscriptionComponent', () => {
  let component: PatientPerscriptionComponent;
  let fixture: ComponentFixture<PatientPerscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPerscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPerscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
