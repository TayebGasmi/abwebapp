import {Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef} from '@angular/core';
import {LazyLoadEvent} from "primeng/api";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {NgTemplateOutlet} from "@angular/common";
import {TableColumn} from "../../../core/models/table-cloumn";
import {ColumnDefDirective} from "../../directives/column-def.directive";
import {MultiSelectModule} from "primeng/multiselect";
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    ButtonDirective,
    Ripple,
    NgTemplateOutlet,
    MultiSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() totalRecords: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPageReportTemplate: string = "Showing {first} to {last} of {totalRecords} entries";
  @Input() rowsPerPageOptions: number[] = [10, 25, 50];
  @Input() multiSelect: boolean = true
  @Output() onLazyLoad: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>();
  @Output() onGlobalFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() withCaption: boolean = true;
  @Input() itemsType: string = 'items';
  @ContentChild('actions')
  actionTemplate: TemplateRef<any> | null = null;
  dataKeys: string = 'id';
  @ContentChildren(ColumnDefDirective)
  columnDefs!: QueryList<ColumnDefDirective>;
  @ContentChild('caption')
  captionTemplate: TemplateRef<any> | null = null;
  globalFilter = new FormControl();
  private debounceTimeMs: number = 300
  selectedItems: any[] = [];

  constructor() {
    this.globalFilter.valueChanges.pipe(filter((val) => val != null), distinctUntilChanged(), debounceTime(this.debounceTimeMs)).subscribe(value => {
      this.onGlobalFilter.emit(value);
    });
  }

  lazyLoad(event: any): void {
    this.onLazyLoad.emit(event);
  }

  getColumnTemplate(field: string): TemplateRef<any> | null {
    const columnDef = this.columnDefs.find(def => def.key === field);
    return columnDef ? columnDef.template : null;
  }

}
