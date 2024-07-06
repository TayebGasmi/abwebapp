import { Component } from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {RouterLink} from "@angular/router";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  templateUrl: './verification.component.html',
  standalone: true,

  imports: [
    InputTextModule,
    KeyFilterModule,
    RouterLink,
    AppConfigComponent,
    ButtonDirective,
    Ripple
  ]
})
export class VerificationComponent {


	constructor(private layoutService: LayoutService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}
    onDigitInput(event: any) {
        let element;
        if (event.code !== 'Backspace')
            if (event.code.includes('Numpad')|| event.code.includes('Digit')) {
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
