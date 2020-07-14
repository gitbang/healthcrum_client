import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZumbaComponent } from './zumba.component';

describe('ZumbaComponent', () => {
  let component: ZumbaComponent;
  let fixture: ComponentFixture<ZumbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZumbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZumbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
