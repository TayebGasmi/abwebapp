import {Component} from '@angular/core';
import {PageLink} from "../../../core/models/page-link";
import {TableColumn} from "../../../core/models/table-cloumn";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotificationService} from "../../../core/service/notification.service";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {SessionDto} from "../../../core/models/session";
import {SessionService} from "../../../core/service/session.service";
import {ButtonDirective} from "primeng/button";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {TableComponent} from "../../../shared/components/table/table.component";
import {CalendarModule} from "primeng/calendar";
import {CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PrimeTemplate} from "primeng/api";
import {AuthService} from "../../../core/service/auth.service";
import {SessionStatus} from "../../../core/enum/session-status";
import {ColumnDefDirective} from "../../../shared/directives/column-def.directive";
import {StepsModule} from "primeng/steps";
import {User} from "../../../core/models/user";

interface GlobalFilter {
  keys: string[];
  value: string;
}

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [
    ButtonDirective,
    FormSideBarComponent,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    Ripple,
    TableComponent,
    CalendarModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    PrimeTemplate,
    NgClass,
    ColumnDefDirective,
    CurrencyPipe,
    StepsModule
  ],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss'
})
export class SessionListComponent {
  data: SessionDto[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  globalFilter!: GlobalFilter;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  columns: TableColumn[] = [
    {field: 'startDateTime', header: 'Start Date', type: 'date', sortable: true, filterable: true},
    {field: 'subject.name', header: 'subject', type: 'text', sortable: true, filterable: true},
    {field: 'teacher', header: 'teacher', type: 'text', sortable: true, filterable: true},
    {field: 'status', header: 'status', type: 'text', sortable: true, filterable: true},
    {field: 'price', header: 'price', type: 'number', sortable: true, filterable: true},
    {field: 'duration', header: 'duration', type: 'number', sortable: true, filterable: true}
  ];
  view: 'display' | 'edit' = 'display';
  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  currentUser!: User;


  constructor(private authService: AuthService, private sessionService: SessionService, private notificationService: NotificationService, private fb: FormBuilder) {
    const user = this.authService.getUser();
    if (user)
      this.currentUser = user
  }


  loadSessions(): void {
    this.sessionService.getCurrentUserSession(this.pageLink).subscribe(pageData => {
      this.data = pageData.data;
      this.totalRecords = pageData.totalElements;
    });
  }
  onLazyLoad(event: any): void {
    this.pageLink.page = event.first! / event.rows!;
    this.pageLink.pageSize = event.rows!;
    if (event.sortField) {
      this.pageLink.sortProperty = event.sortField;
      this.pageLink.sortOrder = event.sortOrder === 1 ? SortOrder.ASC : SortOrder.DESC;
    }
    if (event.filters) {
      this.pageLink.filters = event.filters;
    }
    if (event.globalFilter) {
      this.pageLink.globalFilter = {keys: ['name', 'description'], value: event.globalFilter};
    }
    this.loadSessions();
  }
  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['key', 'value', 'description'], value};
    this.loadSessions();
  }

  protected readonly SessionStatus = SessionStatus;
}
