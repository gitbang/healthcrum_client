import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModelComponent } from './book-model.component';

describe('BookModelComponent', () => {
  let component: BookModelComponent;
  let fixture: ComponentFixture<BookModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
