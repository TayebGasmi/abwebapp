import {Component} from '@angular/core';
import {PageLink} from "../../../core/models/page-link";
import {TableColumn} from "../../../core/models/table-cloumn";
import {NotificationService} from "../../../core/service/notification.service";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {FormGroup} from "@angular/forms";
import {schoolYearForm} from "../../../core/forms/schoolYear.form";
import {SchoolYearService} from "../../../core/service/school-year.service";
import {SchoolYear} from "../../../core/models/school-year";
import {ButtonDirective} from "primeng/button";
import {DeleteConfirmationComponent} from "../../../shared/components/delete-confirmation/delete-confirmation.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {Ripple} from "primeng/ripple";
import {TableComponent} from "../../../shared/components/table/table.component";

@Component({
  selector: 'app-school-year',
  standalone: true,
  imports: [
    ButtonDirective,
    DeleteConfirmationComponent,
    FormComponent,
    FormSideBarComponent,
    Ripple,
    TableComponent
  ],
  templateUrl: './school-year.component.html',
  styleUrl: './school-year.component.scss'
})
export class SchoolYearComponent {
  sidebarVisible = false;
  formTitle = 'Add new School Year';
  data: SchoolYear[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  selectedConfig: SchoolYear | null = null;
  ConfigToDelete: SchoolYear | null = null;
  columns: TableColumn[] = [
    {field: 'name', header: 'Name', type: 'text', sortable: true, filterable: true},
    {field: 'description', header: 'Description', type: 'text', sortable: true, filterable: true},
  ];
  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  showDeleteConfirmation = false;
  showDeleteAllConfirmation: boolean = false;
  protected readonly formFields = schoolYearForm;

  constructor(private SchoolService: SchoolYearService, private notificationService: NotificationService) {
  }

  loadConfigs(): void {
    this.SchoolService.findAll(this.pageLink).subscribe(pageData => {
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
    this.loadConfigs();
  }

  editSchool(school: SchoolYear): void {
    this.selectedConfig = school;
    this.sidebarVisible = true;
    this.formTitle = 'Edit School Year';
  }

  delete(): void {
    this.SchoolService.deleteById((this.ConfigToDelete?.id) as number).subscribe(() => {
      this.loadConfigs();
      this.showDeleteConfirmation = false;
      this.notificationService.showSuccess('School Year deleted successfully');
    });
  }

  save(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    if (this.selectedConfig) {
      this.SchoolService.update({id: this.selectedConfig.id, ...form.value}).subscribe(() => {
        this.loadConfigs();
        this.sidebarVisible = false;
        form.reset();
        this.notificationService.showSuccess('School Year updated successfully');
      })
      return;
    }
    this.SchoolService.save(form.value).subscribe(() => {
      this.loadConfigs();
      this.sidebarVisible = false;
      form.reset();
      this.notificationService.showSuccess('School Year saved successfully');
    });

  }

  onCancel(form: FormGroup): void {
    form.reset();
    this.sidebarVisible = false;
  }

  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['name', 'description'], value};
    this.loadConfigs();
  }

  add() {
    this.sidebarVisible = true;
    this.formTitle = 'Add new School Year';
    this.selectedConfig = null;
  }

  deleteAll(selectedItems: any[]) {
    this.SchoolService.deleteAllByIds(selectedItems).subscribe(() => {
      this.loadConfigs();
      this.showDeleteAllConfirmation = false;
      this.notificationService.showSuccess('Selected School Year deleted successfully');
    });
  }

  confirmDelete(item: any) {
    this.showDeleteConfirmation = true;
    this.ConfigToDelete = item;
  }

  confirmDeleteALL(item: any[]) {
    this.showDeleteAllConfirmation = true;

  }
}
