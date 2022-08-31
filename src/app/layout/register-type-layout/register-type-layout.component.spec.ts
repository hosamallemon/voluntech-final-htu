import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTypeLayoutComponent } from './register-type-layout.component';

describe('RegisterTypeLayoutComponent', () => {
  let component: RegisterTypeLayoutComponent;
  let fixture: ComponentFixture<RegisterTypeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTypeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTypeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
