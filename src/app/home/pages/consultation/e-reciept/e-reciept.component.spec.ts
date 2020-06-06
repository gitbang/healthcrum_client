import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERecieptComponent } from './e-reciept.component';

describe('ERecieptComponent', () => {
  let component: ERecieptComponent;
  let fixture: ComponentFixture<ERecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
