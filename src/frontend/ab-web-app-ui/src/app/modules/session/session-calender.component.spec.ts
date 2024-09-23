import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCalenderComponent } from './session-calender.component';

describe('SessionComponent', () => {
  let component: SessionCalenderComponent;
  let fixture: ComponentFixture<SessionCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCalenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
