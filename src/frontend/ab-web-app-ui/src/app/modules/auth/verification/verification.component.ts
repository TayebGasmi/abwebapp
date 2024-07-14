import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BackgroundComponent} from "../../../shared/components/background/background.component";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  templateUrl: './verification.component.html',
  imports: [
    ReactiveFormsModule,
    BackgroundComponent,
    ButtonDirective,
    Ripple,
    RouterLink,
    InputTextModule,
    KeyFilterModule
  ],
  standalone: true
})
export class VerificationComponent {

  verificationForm: FormGroup;
  email: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }


  verifyCode() {
    if (this.verificationForm.valid) {
      const code = this.verificationForm.value.digit1 + this.verificationForm.value.digit2 + this.verificationForm.value.digit3 + this.verificationForm.value.digit4;
      if (this.email) {
        this.authService.verifyUser(this.email, code).subscribe(response => {
          this.router.navigate(['/auth/login']).then();
        });
      }
    }
  }

  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace')
      if (event.code.includes('Numpad') || event.code.includes('Digit')) {
        element = event.srcElement.nextElementSibling;
      }
    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null)
      return;
    else
      element.focus();
  }
}
