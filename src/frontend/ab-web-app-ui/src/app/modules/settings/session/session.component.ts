import { Component } from '@angular/core';
import {Config} from "../../../core/models/config";
import {PageLink} from "../../../core/models/page-link";
import {TableColumn} from "../../../core/models/table-cloumn";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfigService} from "../../../core/service/config.service";
import {NotificationService} from "../../../core/service/notification.service";
import {SortOrder} from "../../../core/enum/sort-order.enum";
import {SessionDto} from "../../../core/models/session";
import {SessionService} from "../../../core/service/session.service";
import {ButtonDirective} from "primeng/button";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {TableComponent} from "../../../shared/components/table/table.component";
import {Subject} from "../../../core/models/subject";
import {CalendarModule} from "primeng/calendar";
import {DatePipe, NgClass} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PrimeTemplate} from "primeng/api";
import {Teacher} from "../../../core/models/teacher";
import {TeacherService} from "../../../core/service/teacher.service";
import {SubjectService} from "../../../core/service/subject.service";
import {BrowserStorageService} from "../../../core/service/browser-storage.service";
import {User} from "../../../core/models/user";
interface GlobalFilter {
  keys: string[];
  value: string;
}
@Component({
  selector: 'app-session',
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
    NgClass
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  sidebarVisible = false;
  data: SessionDto[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  globalFilter!: GlobalFilter  ;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  columns: TableColumn[] = [
    {field: 'startDateTime', header: 'Start Date', type: 'text', sortable: true, filterable: true},
    {field: 'subject.name', header: 'subject', type: 'text',sortable: false, filterable: false},
    {field: 'teacher.firstName', header: 'teacher', type: 'text',sortable: false, filterable: false}
  ];
  view: 'display' | 'edit' ='display';
  form!: FormGroup
  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  selectedSession!: null | SessionDto
  currentUser!:User ;
  subjects: { label: string, value: Subject }[] = [];
  teachers: { label: string, value: Teacher }[] = [];
  constructor( private browserStorage:BrowserStorageService, private teacherService: TeacherService,
               private subjectService: SubjectService,private sessionService: SessionService, private notificationService: NotificationService, private fb: FormBuilder) {
    this.initForm();
    this.currentUser=JSON.parse(<string>this.browserStorage.getItem('user'));
  }
  resetEvent() {
    this.selectedSession = null;
    this.form.reset();
  }
  loadSessions(): void {
    this.sessionService.findAll(this.pageLink).subscribe(pageData => {
      this.data = pageData.data;
      this.data=this.data.map(session=>({
        ...session,
        'subject.name': session.subject?.name || 'N/A',
        'teacher.firstName': session.teacher?.firstName || 'N/A'
      }))
      this.totalRecords = pageData.totalElements;
    });
  }
  onEditClick() {
    this.view = 'edit';
  }
  handleSave() {
    if (this.form.invalid) {
      return;
    }
    if (this.selectedSession) {
      this.updateSession();
    }
    this.resetEvent();
  }
  onLazyLoad(event: any): void {
    this.pageLink.page = event.first! / event.rows!;
    this.pageLink.pageSize = event.rows!;
    this.pageLink.globalFilter= {keys:["student.email"],value:this.currentUser?.email}
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

  edit(item: SessionDto) {
    this.selectedSession = item;
    this.form.patchValue(item);
    this.sidebarVisible = true;
    this.loadTeachers();
    this.loadSubjects();
    console.log(this.data)
  }


  fieldHasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  private initForm() {
    this.form = this.fb.group({
      startDateTime: ['', Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }
   updateSession() {
    if (this.selectedSession) {
      const updatedSession = {...this.selectedSession, ...this.form.value};
      this.sessionService.update(updatedSession).subscribe(() => {
        this.notificationService.showSuccess('Session updated successfully');
        this.loadSessions();
      });
    }
  }
  private loadTeachers() {
    this.teacherService.getALL().subscribe(result => {
      this.teachers = result.map(u => ({
        label: `${u.firstName} ${u.lastName}`,
        value: u
      }));
    });
  }

  private loadSubjects() {
    this.subjectService.getALL().subscribe(result => {
      this.subjects = result.map(u => ({
        label: u.name,
        value: u
      }));
    });
  }
}
