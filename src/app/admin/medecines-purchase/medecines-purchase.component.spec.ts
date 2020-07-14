import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinesPurchaseComponent } from './medecines-purchase.component';

describe('MedecinesPurchaseComponent', () => {
  let component: MedecinesPurchaseComponent;
  let fixture: ComponentFixture<MedecinesPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinesPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinesPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
