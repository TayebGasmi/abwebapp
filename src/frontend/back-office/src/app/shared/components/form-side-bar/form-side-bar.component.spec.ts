import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormSideBarComponent} from './form-side-bar.component';

describe('FormSideBarComponent', () => {
  let component: FormSideBarComponent;
  let fixture: ComponentFixture<FormSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
