import {Component, OnInit} from '@angular/core';
import {PageLink} from '../../../core/models/page-link';
import {Subject} from '../../../core/models/subject';
import {TableModule} from 'primeng/table';
import {SubjectService} from "../../../core/service/subject.service";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {ButtonDirective} from "primeng/button";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {InputTextModule} from "primeng/inputtext";
import {subjectForm} from "../../../core/forms/subject.form";
import {ToolbarModule} from "primeng/toolbar";
import {Ripple} from "primeng/ripple";
import {FileUploadModule} from "primeng/fileupload";
import {TableComponent} from "../../../shared/components/table/table.component";
import {TableColumn} from "../../../core/models/table-cloumn";
import {ColumnDefDirective} from "../../../shared/directives/column-def.directive";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  imports: [
    TableModule,
    FormSideBarComponent,
    FormComponent,
    ButtonDirective,
    InputTextModule,
    ToolbarModule,
    Ripple,
    FileUploadModule,
    TableComponent,
    ColumnDefDirective
  ],
  standalone: true
})
export class SubjectComponent implements OnInit {
  sidebarVisible = false;
  formTitle = 'Add new Subject';
  data: Subject[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  selectedSubject: Subject | null = null;
  protected readonly formFields = subjectForm;

  columns: TableColumn[] = [
    {field: 'name', header: 'Name', type: 'date', sortable: true, filterable: true},
    {field: 'description', header: 'Description', type: 'boolean', sortable: true, filterable: true},
  ];

  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.loadSubjects();
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
    console.log(event)

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

  deleteSubject(subject: Subject): void {
    this.subjectService.deleteById(subject.id).subscribe(() => {
      this.loadSubjects();
    });
  }

  saveSubject(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    const next = () => {
      this.loadSubjects();
      this.sidebarVisible = false;
      form.reset();
    }
    if (this.selectedSubject) {
      this.subjectService.updateById(form.value, this.selectedSubject.id).subscribe(() => {
        next();
      })
      return;
    }
    this.subjectService.save(form.value).subscribe(() => {
      next();
    });

  }

  onCancel(): void {

    this.sidebarVisible = false;
  }

  onGlobalFilter(value: string) {
    this.pageLink.globalFilter = {keys: ['name', 'description'], value};
    this.loadSubjects();
  }

  addSubject() {
    this.sidebarVisible = true;
    this.formTitle = 'Add new Subject';
    this.selectedSubject = null;
  }
}
