import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LayoutService} from "../../layout/service/app.layout.service";
import {TagModule} from "primeng/tag";
import {CurrencyPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {InputNumberModule} from "primeng/inputnumber";
import {User} from "../../core/models/user";
import {AuthService} from "../../core/service/auth.service";
import {AppConfigComponent} from "../../layout/config/app.config.component";
import {Router} from "@angular/router";
import {StyleClassModule} from "primeng/styleclass";
import {AnimateenterDirective} from "../../shared/directives/animateenter.directive";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
interface MonthlyPayment {
  name?: string;
  amount?: number;
  paid?: boolean;
  date?: string;
}

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    TagModule,
    CurrencyPipe,
    TableModule,
    InputNumberModule,
    AppConfigComponent,
    StyleClassModule,
    AnimateenterDirective,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  subscription: Subscription;

  darkMode: boolean = false;

  constructor(public router: Router, private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(config => {
      this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
