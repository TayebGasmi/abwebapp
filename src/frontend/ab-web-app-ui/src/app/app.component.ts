import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule
  ]
})
export class AppComponent {

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

}
