import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerFeedComponent } from './follower-feed.component';

describe('FollowerFeedComponent', () => {
  let component: FollowerFeedComponent;
  let fixture: ComponentFixture<FollowerFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
