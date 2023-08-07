import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlistPopupComponent } from './friendlist-popup.component';

describe('FriendlistPopupComponent', () => {
  let component: FriendlistPopupComponent;
  let fixture: ComponentFixture<FriendlistPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendlistPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendlistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
