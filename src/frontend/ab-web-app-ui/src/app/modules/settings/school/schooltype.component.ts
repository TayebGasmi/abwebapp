import {Component} from '@angular/core';
import {PageLink} from "../../../core/models/page-link";
import {TableColumn} from "../../../core/models/table-cloumn";
import {SchoolService} from "../../../core/service/school.service";
import {NotificationService} from "../../../core/service/notification.service";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {FormGroup} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {DeleteConfirmationComponent} from "../../../shared/components/delete-confirmation/delete-confirmation.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {Ripple} from "primeng/ripple";
import {TableComponent} from "../../../shared/components/table/table.component";
import {schoolTypeForm} from "../../../core/forms/schoolType.form";
import {SchoolType} from "../../../core/models/school-type";

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [
    ButtonDirective,
    DeleteConfirmationComponent,
    FormComponent,
    FormSideBarComponent,
    Ripple,
    TableComponent
  ],
  templateUrl: './schooltype.component.html',
  styleUrl: './schooltype.component.scss'
})
export class SchooltypeComponent {
  sidebarVisible = false;
  formTitle = 'Add new School type';
  data: SchoolType[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  selectedSchool: SchoolType | null = null;
  SchoolToDelete: SchoolType | null = null;
  columns: TableColumn[] = [
    {field: 'name', header: 'Name', type: 'text', sortable: true, filterable: true},
    {field: 'description', header: 'Description', type: 'text', sortable: true, filterable: true},
  ];
  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  showDeleteConfirmation = false;
  showDeleteAllConfirmation: boolean = false;
  protected readonly formFields = schoolTypeForm;

  constructor(private SchoolService: SchoolService, private notificationService: NotificationService) {
  }

  loadSchools(): void {
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
    this.loadSchools();
  }

  editSchool(school: SchoolType): void {
    this.selectedSchool = school;
    this.sidebarVisible = true;
    this.formTitle = 'Edit School';
  }

  delete(): void {
    this.SchoolService.deleteById((this.SchoolToDelete?.id) as number).subscribe(() => {
      this.loadSchools();
      this.showDeleteConfirmation = false;
      this.notificationService.showSuccess('School deleted successfully');
    });
  }

  save(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    if (this.selectedSchool) {
      this.SchoolService.update({id: this.selectedSchool.id, ...form.value}).subscribe(() => {
        this.loadSchools();
        this.sidebarVisible = false;
        form.reset();
        this.notificationService.showSuccess('School updated successfully');
      })
      return;
    }
    this.SchoolService.save(form.value).subscribe(() => {
      this.loadSchools();
      this.sidebarVisible = false;
      form.reset();
      this.notificationService.showSuccess('School saved successfully');
    });

  }

  onCancel(form: FormGroup): void {
    form.reset();
    this.sidebarVisible = false;
  }

  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['name', 'description'], value};
    this.loadSchools();
  }

  add() {
    this.sidebarVisible = true;
    this.formTitle = 'Add new School';
    this.selectedSchool = null;
  }

  deleteAll(selectedItems: any[]) {
    this.SchoolService.deleteAllByIds(selectedItems).subscribe(() => {
      this.loadSchools();
      this.showDeleteAllConfirmation = false;
      this.notificationService.showSuccess('Selected School types deleted successfully');
    });
  }

  confirmDelete(item: any) {
    this.showDeleteConfirmation = true;
    this.SchoolToDelete = item;
  }

  confirmDeleteALL() {
    this.showDeleteAllConfirmation = true;

  }
}
