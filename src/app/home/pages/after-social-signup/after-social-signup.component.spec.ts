import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSocialSignupComponent } from './after-social-signup.component';

describe('AfterSocialSignupComponent', () => {
  let component: AfterSocialSignupComponent;
  let fixture: ComponentFixture<AfterSocialSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSocialSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSocialSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
