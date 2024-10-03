import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTeacherComponent } from './landing-teacher.component';

describe('LandingTeacherComponent', () => {
  let component: LandingTeacherComponent;
  let fixture: ComponentFixture<LandingTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
