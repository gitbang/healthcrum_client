import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerscriptionComponent } from './perscription.component';

describe('PerscriptionComponent', () => {
  let component: PerscriptionComponent;
  let fixture: ComponentFixture<PerscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
