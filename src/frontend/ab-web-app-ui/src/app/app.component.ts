import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {RouterOutlet} from "@angular/router";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    console.log(environment.production);
  }

}
