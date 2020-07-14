import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DitecianComponent } from './ditecian.component';

describe('DitecianComponent', () => {
  let component: DitecianComponent;
  let fixture: ComponentFixture<DitecianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DitecianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DitecianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
