import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSubjectComponent } from './landing-subject.component';

describe('LandingSubjectComponent', () => {
  let component: LandingSubjectComponent;
  let fixture: ComponentFixture<LandingSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
