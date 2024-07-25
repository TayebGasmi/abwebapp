import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [
    DialogModule,
    ButtonDirective,
    Ripple,
    NgTemplateOutlet
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {
  @Input()
  get showDeleteConfirmation(): boolean {
    return this._showDeleteConfirmation;
  }

  @Output() showDeleteConfirmationChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  set showDeleteConfirmation(value: boolean) {
    this._showDeleteConfirmation = value;
    this.showDeleteConfirmationChange.emit(this._showDeleteConfirmation);
  }

  private _showDeleteConfirmation: boolean = false;
  @Input() message: string = 'Are you sure you want to delete this record?';
  @ContentChild("confirmButton") confirmButton!: TemplateRef<any>

}
