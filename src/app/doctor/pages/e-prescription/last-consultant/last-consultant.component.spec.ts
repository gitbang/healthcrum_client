import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastConsultantComponent } from './last-consultant.component';

describe('LastConsultantComponent', () => {
  let component: LastConsultantComponent;
  let fixture: ComponentFixture<LastConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
