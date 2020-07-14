import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInventryComponent } from './products-inventry.component';

describe('ProductsInventryComponent', () => {
  let component: ProductsInventryComponent;
  let fixture: ComponentFixture<ProductsInventryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsInventryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
