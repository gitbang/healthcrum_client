import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HraStoryBoardComponent } from './hra-story-board.component';

describe('HraStoryBoardComponent', () => {
  let component: HraStoryBoardComponent;
  let fixture: ComponentFixture<HraStoryBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HraStoryBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HraStoryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
