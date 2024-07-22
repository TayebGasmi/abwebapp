import {Component, OnInit} from '@angular/core';
import {PageLink} from '../../../core/models/page-link';
import {Subject} from '../../../core/models/subject';
import {TableModule} from 'primeng/table';
import {SubjectService} from "../../../core/service/subject.service";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {ButtonDirective} from "primeng/button";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {FilterModel} from "../../../core/models/filter-model";
import {InputTextModule} from "primeng/inputtext";
import {subjectForm} from "../../../core/forms/subject.form";
import {ToolbarModule} from "primeng/toolbar";
import {Ripple} from "primeng/ripple";
import {FileUploadModule} from "primeng/fileupload";

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
    FileUploadModule
  ],
  standalone: true
})
export class SubjectComponent implements OnInit {
  sidebarVisible = false;
  formTitle = 'Add new Subject';
  data: Subject[] = [];
  totalRecords: number = 0;
  pageSize= 10;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  selectedSubject: Subject | null = null;
  protected readonly subjectForm = subjectForm;

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    // Initially load the subjects with default pagination
    this.loadSubjects();
  }

  loadSubjects(): void {
    console.log(this.pageLink);
    this.subjectService.findAll(this.pageLink).subscribe(pageData => {
      this.data = pageData.data;
      this.totalRecords = pageData.totalElements;

    });
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

  onLazyLoad(event: any): void {
    console.log(event);
    this.pageLink.page = event.first! / event.rows!;
    this.pageLink.pageSize = event.rows!;
    if(event.sortField) {
      this.pageLink.sortProperty = event.sortField;
      this.pageLink.sortOrder = event.sortOrder === 1 ? SortOrder.ASC : SortOrder.DESC;
    }
    if (event.filters) {
      this.pageLink.filters = event.filters
    }
   if (event.globalFilter){
      this.pageLink.globalFilter = {keys: ['name', 'description'], value: event.globalFilter};
   }
    this.loadSubjects();
  }

  saveSubject(): void {
    if (this.selectedSubject) {
      this.subjectService.updateById(this.selectedSubject, this.selectedSubject.id).subscribe(() => {
        this.loadSubjects();
        this.sidebarVisible = false;
      });
    } else {
      // Create a new subject logic here
    }
  }

  onCancel(): void {
    this.sidebarVisible = false;
  }

  protected readonly SortOrder = SortOrder;
}
