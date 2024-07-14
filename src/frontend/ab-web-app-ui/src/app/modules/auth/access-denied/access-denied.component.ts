import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Button} from "primeng/button";

@Component({
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
  selector: 'app-access-denied',
  imports: [
    RouterLink,
    Button
  ],
  standalone: true
})
export class AccessDeniedComponent {
}
