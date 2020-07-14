import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureEntryComponent } from './temperature-entry.component';

describe('TemperatureEntryComponent', () => {
  let component: TemperatureEntryComponent;
  let fixture: ComponentFixture<TemperatureEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
