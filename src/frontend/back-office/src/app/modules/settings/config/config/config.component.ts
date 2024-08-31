import {Component} from '@angular/core';
import {Config} from "../../../../core/models/config";
import {PageLink} from "../../../../core/models/page-link";
import {TableColumn} from "../../../../core/models/table-cloumn";
import {NotificationService} from "../../../../core/service/notification.service";
import {SortOrder} from "../../../../core/enum/sort-order.enum";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfigService} from "../../../../core/service/config.service";
import {ButtonDirective} from "primeng/button";
import {DeleteConfirmationComponent} from "../../../../shared/components/delete-confirmation/delete-confirmation.component";
import {FormComponent} from "../../../../shared/components/form/form.component";
import {FormSideBarComponent} from "../../../../shared/components/form-side-bar/form-side-bar.component";
import {Ripple} from "primeng/ripple";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    ButtonDirective,
    DeleteConfirmationComponent,
    FormComponent,
    FormSideBarComponent,
    Ripple,
    TableComponent,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  sidebarVisible = false;
  data: Config[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  columns: TableColumn[] = [
    {field: 'key', header: 'Key', type: 'text', sortable: true, filterable: true},
    {field: 'value', header: 'Value', type: 'text', sortable: true, filterable: true},
    {field: 'description', header: 'Description', type: 'text', sortable: true, filterable: true}
  ];
  form!: FormGroup
  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  selectedConfig!: Config

  constructor(private SchoolService: ConfigService, private notificationService: NotificationService, private fb: FormBuilder) {
    this.initForm();
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

  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['key', 'value', 'description'], value};
    this.loadConfigs();
  }

  edit(item: Config) {
    this.selectedConfig = item;
    this.form.patchValue(item);
    this.sidebarVisible = true;

  }

  cancel() {
    this.sidebarVisible = false;
    this.form.reset();
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.form.value;
    this.SchoolService.update({...formData, key: this.selectedConfig.key, id: this.selectedConfig.id}).subscribe(() => {
      this.notificationService.showSuccess('Config update successfully');
      this.loadConfigs();
      this.sidebarVisible = false;
      this.form.reset();
    });
  }

  fieldHasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  private initForm() {
    this.form = this.fb.group({
      value: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
