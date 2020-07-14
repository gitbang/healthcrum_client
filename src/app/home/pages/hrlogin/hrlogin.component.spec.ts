import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrloginComponent } from './hrlogin.component';

describe('HrloginComponent', () => {
  let component: HrloginComponent;
  let fixture: ComponentFixture<HrloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
