import { Component } from '@angular/core';
import {SessionDto} from "../../../core/models/session";
import { DatePipe } from "@angular/common";
import {FormGroup, FormsModule} from "@angular/forms";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";
import {ToggleButtonModule} from "primeng/togglebutton";
import {RippleModule} from "primeng/ripple";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";
import {SessionService} from "../../../core/service/session.service";
import {
  DeleteConfirmationComponent
} from "../../../shared/components/delete-confirmation/delete-confirmation.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {TableComponent} from "../../../shared/components/table/table.component";
import {PageLink} from "../../../core/models/page-link";
import {TableColumn} from "../../../core/models/table-cloumn";
import {NotificationService} from "../../../core/service/notification.service";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {sessionForm} from "../../../core/forms/session.form";

@Component({
  selector: 'app-sessionlist',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    DeleteConfirmationComponent,
    FormComponent,
    FormSideBarComponent,
    TableComponent
  ],
  templateUrl: './sessionlist.component.html',
  styleUrl: './sessionlist.component.scss'
})
export class SessionlistComponent {
  sidebarVisible = false;
  formTitle = 'Add new Session';
  data: SessionDto[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  selectedSession: SessionDto | null = null;
  protected readonly formFields = sessionForm;
  sessionToDelete: SessionDto | null = null;

  columns: TableColumn[] = [
    {field: 'title', header: 'Title', type: 'text', sortable: true, filterable: true},
    {field: 'description', header: 'Description', type: 'text', sortable: true, filterable: true},
    {field: 'startTime', header: 'Start Date', type: 'date', sortable: true, filterable: true},
    {field: 'endTime', header: 'End Date', type: 'date', sortable: true, filterable: true},
    {field: 'sessionLink', header: 'Link', type: 'text', sortable: true, filterable: true},
  ];

  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  showDeleteConfirmation=false;

  constructor(private sessionService: SessionService, private notificationService: NotificationService) {
  }

  loadSessions(): void {
    this.sessionService.findAll(this.pageLink).subscribe(pageData => {
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

  editSubject(session: SessionDto): void {
    this.selectedSession = session;
    console.log(session)
    this.sidebarVisible = true;
    this.formTitle = 'Edit session';
  }

  delete(): void {
    this.sessionService.deleteById((this.sessionToDelete?.id) as number).subscribe(() => {
      this.loadSessions();
      this.showDeleteConfirmation = false;
      this.notificationService.showSuccess('Subject deleted successfully');
    });
  }

  save(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    if (this.selectedSession) {
      this.sessionService.updateById({id:this.selectedSession.id,...form.value}, this.selectedSession.id).subscribe(() => {
        this.loadSessions();
        this.sidebarVisible = false;
        form.reset();
        this.notificationService.showSuccess('Session updated successfully');
      })
      return;
    }
    this.sessionService.save(form.value).subscribe(() => {
      this.loadSessions();
      this.sidebarVisible = false;
      form.reset();
      this.notificationService.showSuccess('Session saved successfully');
    });

  }

  onCancel(form: FormGroup): void {
    form.reset();
    this.sidebarVisible = false;
  }

  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['title', 'description'], value};
    this.loadSessions();
  }

  add() {
    this.sidebarVisible = true;
    this.formTitle = 'Add new Subject';
    this.selectedSession = null;
  }

  deleteAll(selectedItems: any[]) {
    console.log(selectedItems)
  }

  confirmDelete(item: any) {
    this.showDeleteConfirmation = true;
    this.sessionToDelete = item;
  }
}
