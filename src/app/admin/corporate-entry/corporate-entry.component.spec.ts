import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateEntryComponent } from './corporate-entry.component';

describe('CorporateEntryComponent', () => {
  let component: CorporateEntryComponent;
  let fixture: ComponentFixture<CorporateEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
