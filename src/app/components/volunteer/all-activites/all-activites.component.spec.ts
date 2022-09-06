import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivitesComponent } from './all-activites.component';

describe('AllActivitesComponent', () => {
  let component: AllActivitesComponent;
  let fixture: ComponentFixture<AllActivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllActivitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
