import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SchooltypeComponent} from './schooltype.component';

describe('SchoolComponent', () => {
  let component: SchooltypeComponent;
  let fixture: ComponentFixture<SchooltypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchooltypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchooltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
