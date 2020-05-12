import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReqFormComponent } from './new-req-form.component';

describe('NewReqFormComponent', () => {
  let component: NewReqFormComponent;
  let fixture: ComponentFixture<NewReqFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReqFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
