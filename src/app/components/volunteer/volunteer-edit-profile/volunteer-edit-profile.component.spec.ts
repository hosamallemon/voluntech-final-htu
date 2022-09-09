import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerEditProfileComponent } from './volunteer-edit-profile.component';

describe('VolunteerEditProfileComponent', () => {
  let component: VolunteerEditProfileComponent;
  let fixture: ComponentFixture<VolunteerEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
