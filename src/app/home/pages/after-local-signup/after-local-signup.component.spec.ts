import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLocalSignupComponent } from './after-local-signup.component';

describe('AfterLocalSignupComponent', () => {
  let component: AfterLocalSignupComponent;
  let fixture: ComponentFixture<AfterLocalSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterLocalSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLocalSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
