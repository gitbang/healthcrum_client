import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinesInventryComponent } from './medecines-inventry.component';

describe('MedecinesInventryComponent', () => {
  let component: MedecinesInventryComponent;
  let fixture: ComponentFixture<MedecinesInventryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinesInventryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinesInventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
