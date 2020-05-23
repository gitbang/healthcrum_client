import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocationSelectorComponent } from './map-location-selector.component';

describe('MapLocationSelectorComponent', () => {
  let component: MapLocationSelectorComponent;
  let fixture: ComponentFixture<MapLocationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLocationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLocationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
