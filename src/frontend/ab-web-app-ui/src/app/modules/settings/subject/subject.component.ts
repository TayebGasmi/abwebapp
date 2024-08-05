import {Component, OnInit} from '@angular/core';
import {PageLink} from '../../../core/models/page-link';
import {Subject} from '../../../core/models/subject';
import {TableModule} from 'primeng/table';
import {SubjectService} from "../../../core/service/subject.service";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {ButtonDirective} from "primeng/button";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {subjectForm} from "../../../core/forms/subject.form";
import {Ripple} from "primeng/ripple";
import {TableComponent} from "../../../shared/components/table/table.component";
import {TableColumn} from "../../../core/models/table-cloumn";
import {ColumnDefDirective} from "../../../shared/directives/column-def.directive";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotificationService} from "../../../core/service/notification.service";
import {DeleteConfirmationComponent} from "../../../shared/components/delete-confirmation/delete-confirmation.component";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {SchoolType} from "../../../core/models/SchoolType";
import {SchoolService} from "../../../core/service/school.service";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  imports: [
    TableModule,
    FormSideBarComponent,
    FormComponent,
    ButtonDirective,
    Ripple,
    TableComponent,
    ColumnDefDirective,
    DeleteConfirmationComponent,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  standalone: true
})
export class SubjectComponent implements OnInit {
  ngOnInit(): void {
    this.initForm();
  }

  sidebarVisible = false;
  formTitle = 'Add new Subject';
  data: Subject[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  selectedSubject: Subject | null = null;
  protected readonly formFields = subjectForm;
  subjectToDelete: Subject | null = null;

  columns: TableColumn[] = [
    {field: 'name', header: 'Name', type: 'text', sortable: true, filterable: true},
    {field: 'description', header: 'Description', type: 'text', sortable: true, filterable: true},
  ];

  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  showDeleteConfirmation = false;
  form!: FormGroup;
  schoolTypes!: SchoolType[];

  constructor(private subjectService: SubjectService, private notificationService: NotificationService, private fb: FormBuilder,private schoolTypeService: SchoolService) {
    this.initForm();

  }

  loadSubjects(): void {
    this.subjectService.findAll(this.pageLink).subscribe(pageData => {
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
    this.loadSubjects();
  }

  editSubject(subject: Subject): void {
    this.selectedSubject = subject;
    this.sidebarVisible = true;
    this.formTitle = 'Edit Subject';
  }

  delete(): void {
    this.subjectService.deleteById((this.subjectToDelete?.id) as number).subscribe(() => {
      this.loadSubjects();
      this.showDeleteConfirmation = false;
      this.notificationService.showSuccess('Subject deleted successfully');
    });
  }

  save(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    if (this.selectedSubject) {
      this.subjectService.updateById({id: 0, ...form.value}, this.selectedSubject.id).subscribe(() => {
        this.loadSubjects();
        this.sidebarVisible = false;
        form.reset();
        this.notificationService.showSuccess('Subject updated successfully');
      })
      return;
    }
    this.subjectService.save(form.value).subscribe(() => {
      this.loadSubjects();
      this.sidebarVisible = false;
      form.reset();
      this.notificationService.showSuccess('Subject saved successfully');
    });

  }

  onCancel(form: FormGroup): void {
    form.reset();
    this.sidebarVisible = false;
  }

  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['name', 'description'], value};
    this.loadSubjects();
  }

  add() {
    this.sidebarVisible = true;
    this.formTitle = 'Add new Subject';
    this.selectedSubject = null;
  }

  deleteAll(selectedItems: any[]) {
    console.log(selectedItems)
  }

  confirmDelete(item: any) {
    this.showDeleteConfirmation = true;
    this.subjectToDelete = item;
  }


  private initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      schoolType: ['', [Validators.required]],
      schoolYear: ['', [Validators.required]]
    });
  }

  fieldHasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
}
