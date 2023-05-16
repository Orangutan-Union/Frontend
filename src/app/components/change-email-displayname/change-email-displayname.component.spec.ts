import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailDisplaynameComponent } from './change-email-displayname.component';

describe('ChangeEmailDisplaynameComponent', () => {
  let component: ChangeEmailDisplaynameComponent;
  let fixture: ComponentFixture<ChangeEmailDisplaynameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEmailDisplaynameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeEmailDisplaynameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
