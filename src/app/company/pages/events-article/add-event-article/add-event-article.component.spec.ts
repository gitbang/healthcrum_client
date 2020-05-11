import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventArticleComponent } from './add-event-article.component';

describe('AddEventArticleComponent', () => {
  let component: AddEventArticleComponent;
  let fixture: ComponentFixture<AddEventArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
