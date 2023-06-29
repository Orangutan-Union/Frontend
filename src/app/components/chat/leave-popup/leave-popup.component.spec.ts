import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePopupComponent } from './leave-popup.component';

describe('LeavePopupComponent', () => {
  let component: LeavePopupComponent;
  let fixture: ComponentFixture<LeavePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
