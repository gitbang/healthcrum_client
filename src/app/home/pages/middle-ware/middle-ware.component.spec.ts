import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleWareComponent } from './middle-ware.component';

describe('MiddleWareComponent', () => {
  let component: MiddleWareComponent;
  let fixture: ComponentFixture<MiddleWareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleWareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleWareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
