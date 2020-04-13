import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAnalysisComponent } from './health-analysis.component';

describe('HealthAnalysisComponent', () => {
  let component: HealthAnalysisComponent;
  let fixture: ComponentFixture<HealthAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
