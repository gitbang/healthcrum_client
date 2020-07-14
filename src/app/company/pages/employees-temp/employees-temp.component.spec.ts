import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTempComponent } from './employees-temp.component';

describe('EmployeesTempComponent', () => {
  let component: EmployeesTempComponent;
  let fixture: ComponentFixture<EmployeesTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
