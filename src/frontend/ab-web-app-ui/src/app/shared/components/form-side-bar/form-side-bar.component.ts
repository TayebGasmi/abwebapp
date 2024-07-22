import {Component, Input} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'app-form-side-bar',
  standalone: true,
  imports: [
    SidebarModule,
  ],
  templateUrl: './form-side-bar.component.html',
  styleUrl: './form-side-bar.component.scss',
})
export class FormSideBarComponent {

  @Input()
  title!: string
  @Input()
  sidebarVisible: boolean = false

}
