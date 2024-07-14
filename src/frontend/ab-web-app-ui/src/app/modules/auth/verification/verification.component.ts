import {Component} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {BackgroundComponent} from "../../../shared/components/background/background.component";

@Component({
  templateUrl: './verification.component.html',
  standalone: true,

  imports: [
    InputTextModule,
    KeyFilterModule,
    RouterLink,
    ButtonDirective,
    Ripple,
    BackgroundComponent
  ]
})
export class VerificationComponent {


  constructor() {
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
