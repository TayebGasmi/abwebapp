import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';

@Component({
  selector: 'app-form-side-bar',
  standalone: true,
  imports: [
    SidebarModule,
  ],
  templateUrl: './form-side-bar.component.html',
  styleUrls: ['./form-side-bar.component.scss'],
})
export class FormSideBarComponent {
  @Input() title!: string;
  @Output() sidebarVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _sidebarVisible: boolean = false;

  @Input()
  get sidebarVisible(): boolean {
    return this._sidebarVisible;
  }

  set sidebarVisible(value: boolean) {
    this._sidebarVisible = value;
    this.sidebarVisibleChange.emit(this._sidebarVisible);
  }
}
