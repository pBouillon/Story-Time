import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbortPlayedStoryDialogComponent } from './abort-played-story-dialog.component';

describe('AbortPlayedStoryDialogComponent', () => {
  let component: AbortPlayedStoryDialogComponent;
  let fixture: ComponentFixture<AbortPlayedStoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbortPlayedStoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbortPlayedStoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
