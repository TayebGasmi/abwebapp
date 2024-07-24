import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appColumnDef]',
  standalone: true
})
export class ColumnDefDirective {
  @Input('appColumnDef') key!: string;

  constructor(public template: TemplateRef<any>) {
  }
}
