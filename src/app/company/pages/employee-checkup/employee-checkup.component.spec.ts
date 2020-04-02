import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCheckupComponent } from './employee-checkup.component';

describe('EmployeeCheckupComponent', () => {
  let component: EmployeeCheckupComponent;
  let fixture: ComponentFixture<EmployeeCheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
