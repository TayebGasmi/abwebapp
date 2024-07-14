import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {BackgroundComponent} from "../../../shared/components/background/background.component";
import {AuthService} from "../../../core/service/auth.service";
import {FormsModule} from "@angular/forms";
import {InputOtpModule} from "primeng/inputotp";

@Component({
  templateUrl: './verification.component.html',
  standalone: true,

  imports: [
    InputTextModule,
    KeyFilterModule,
    RouterLink,
    ButtonDirective,
    Ripple,
    BackgroundComponent,
    FormsModule,
    InputOtpModule
  ]
})
export class VerificationComponent implements OnInit{
  email: string | null = null;
  verificationCode: string='';

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }
  verify() {
    console.log('Verification Code:', this.verificationCode);
    console.log('Email:', this.email);

    if (this.email) {
      this.authService.verifyUser(this.email, this.verificationCode).subscribe(response => {
        console.log('Verification response:', response);
        this.router.navigate(['/auth/login']).then();
      }, error => {
        console.error('Verification error:', error);
      });
    }
  }

}
