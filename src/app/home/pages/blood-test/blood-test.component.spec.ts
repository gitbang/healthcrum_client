import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestComponent } from './blood-test.component';

describe('BloodTestComponent', () => {
  let component: BloodTestComponent;
  let fixture: ComponentFixture<BloodTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
