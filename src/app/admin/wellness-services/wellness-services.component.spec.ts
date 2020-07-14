import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessServicesComponent } from './wellness-services.component';

describe('WellnessServicesComponent', () => {
  let component: WellnessServicesComponent;
  let fixture: ComponentFixture<WellnessServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellnessServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnessServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
