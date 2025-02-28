import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageLink} from "../../../core/models/page-link";
import {TableColumn} from "../../../core/models/table-cloumn";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {RoleName} from "../../../core/models/role";
import {MatchMode} from "../../../core/enum/match-mode.enum";
import {Operator} from "../../../core/enum/operator.enum";
import {DeleteConfirmationComponent} from "../../../shared/components/delete-confirmation/delete-confirmation.component";
import {Subscription} from "rxjs";
import {SessionAddComponent} from "../session-add/session-add.component";
import {SessionDetailsComponent} from "../session-details/session-details.component";
import {RxStompService} from "../../../core/service/rx-stomp.service";


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
    StepsModule,
    DeleteConfirmationComponent,
    SessionAddComponent,
    SessionDetailsComponent
  ],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss'
})
export class SessionListComponent implements OnInit, OnDestroy {

  data: SessionDto[] = [];
  totalRecords: number = 0;
  pageSize = 10;
  selectedSession: SessionDto | null = null;
  pageLink: PageLink = {page: 0, pageSize: this.pageSize};
  columns: TableColumn[] = [
    {field: 'startDateTime', header: 'Start Date', type: 'date', sortable: true, filterable: true},
    {field: 'subject', header: 'subject', type: 'text', sortable: true, filterable: true},
    {field: 'status', header: 'status', type: 'text', sortable: true, filterable: true},
    {field: 'price', header: 'price', type: 'number', sortable: true, filterable: true},
    {field: 'duration', header: 'duration', type: 'number', sortable: true, filterable: true}
  ];
  title = '';
  currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} entries";
  rowsPerPageOptions = [10, 25, 50];
  currentRole!: RoleName;
  showCancelSession: boolean = false
  showDialog = false;
  view: 'display' | 'edit' | 'new' = 'display';
  currentDate = new Date();
  isTeacher = false
  Subscriptions: Subscription[] = []
  disableEdit = false;
  sessionEditStartTime = new FormControl<any>(null, Validators.required);

  constructor(private authService: AuthService, private sessionService: SessionService, private notificationService: NotificationService, private rxStompService: RxStompService
  ) {
    const user = this.authService.getUser();
    if (user)
      this.currentRole = user.roles[0].name;
    this.isTeacher = this.authService.hasRoles([RoleName.TEACHER])
  }

  ngOnInit(): void {
    this.addRoleBasedColumn()
    this.getSessionFormWs();

  }
  loadSessions(): void {
    this.sessionService.getCurrentUserSession(this.pageLink).subscribe(pageData => {
      this.data = pageData.data;
      this.totalRecords = pageData.totalElements;
    });
  }

  onEditClick() {
    this.view = 'edit';
    this.title = `edit ${this.selectedSession?.title}`
    if (this.selectedSession)
      this.sessionEditStartTime.patchValue(new Date(this.selectedSession?.startDateTime))
    console.log(this.selectedSession?.startDateTime)
  }

  resetEvent() {
    this.selectedSession = null;

  }

  handleSave() {

    if (this.sessionEditStartTime.invalid) return;
    this.updateSession();
    this.showDialog = false;
    this.resetEvent();
  }

  onLazyLoad(event: any): void {
    this.pageLink.page = event.first! / event.rows!;
    this.pageLink.pageSize = event.rows!;
    if (event.sortField) {
      this.handleSorting(event.sortField, event.sortOrder);
    }
    if (event.sortField) {
      this.handleSorting(event.sortField, event.sortOrder);
    }
    if (event.filters) {
      this.pageLink.filters = this.handleFiltering(event.filters);
    }
    this.loadSessions();
  }

  onGlobalFilter(value: string) {
    if (this.currentRole === RoleName.STUDENT)
      this.pageLink.globalFilter = {keys: ['subject.name', 'status', 'teacher.firstName', 'teacher.lastName'], value};
    if (this.currentRole == RoleName.TEACHER)
      this.pageLink.globalFilter = {keys: ['subject.name', 'status', 'student.firstName', 'student.lastName'], value};
    this.loadSessions();
  }

  onCancelSessionConfirmed() {
    if (this.selectedSession)
      this.sessionService.cancelSession(this.selectedSession?.id).subscribe(() => {
          this.notificationService.showSuccess('Session canceled successfully');
          this.loadSessions();
          this.showCancelSession = false
          this.showDialog = false
        }
      )
  }

  onCancelClick() {
    this.showCancelSession = true

  }

  handleBack() {
    this.view = 'display'
  }

  handleSessionPayment() {
    this.showDialog = false
    this.notificationService.showSuccess("payment done successfully.")
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach(sub => sub.unsubscribe())
  }

  addNewSession() {
    this.resetEvent();
    this.showDialog = true;
    this.view = 'new';
    this.title = 'New Session';
  }

  showSessionDetails(session: SessionDto) {
    this.selectedSession = session
    this.title = this.selectedSession.title;
    this.disableEditIfNecessary();
    this.view = 'display';
    this.showDialog = true;
  }

  private getSessionFormWs() {
    this.Subscriptions.push(
      this.rxStompService.watch("/session")
      .subscribe(
        () => this.loadSessions()
      )
    );
  }

  private updateSession() {
    if (this.selectedSession) {
      const updatedSession = {...this.selectedSession, startDateTime: this.sessionEditStartTime.value};
      this.sessionService.update(updatedSession).subscribe(() => {
        this.notificationService.showSuccess('Session updated successfully');
        this.loadSessions();
      });
    }
  }

  private addRoleBasedColumn() {
    if (this.currentRole === RoleName.STUDENT)
      this.columns.push({field: 'teacher', header: 'teacher', type: 'text', filterable: true, sortable: true})
    if (this.currentRole === RoleName.TEACHER)
      this.columns.push({field: 'student', header: 'student', type: 'text', filterable: true, sortable: true})
  }
  protected readonly SessionStatus = SessionStatus;

  private handleSorting(sortField: string, sortOrder: number): void {
    let sortProperty = sortField;

    if (sortField === 'subject') {
      sortProperty = 'subject.name';
    }
    if (sortField === 'teacher') {
      sortProperty = 'teacher.firstName';
    }
    if (sortField === 'student') {
      sortProperty = 'student.firstName';
    }

    this.pageLink.sortProperty = sortProperty;
    this.pageLink.sortOrder = sortOrder === 1 ? SortOrder.ASC : SortOrder.DESC;
  }

  private handleFiltering(filters: any): any {
    const refinedFilters = {...filters};

    if (filters.teacher) {
      const teacherFilter = filters.teacher[0].value;
      refinedFilters['teacher.firstName'] = [{matchMode: MatchMode.CONTAINS, value: teacherFilter, operator: Operator.AND}];
      refinedFilters['teacher.lastName'] = [{matchMode: MatchMode.CONTAINS, value: teacherFilter, operator: Operator.AND}];
      delete refinedFilters.teacher;
    }


    if (filters.student) {
      const studentFilter = filters.student[0].value;
      refinedFilters['student.firstName'] = [{matchMode: MatchMode.CONTAINS, value: studentFilter, operator: Operator.AND}];
      refinedFilters['student.lastName'] = [{matchMode: MatchMode.CONTAINS, value: studentFilter, operator: Operator.AND}];
      delete refinedFilters.student;
    }

    if (filters.subject) {
      const subjectFilter = filters.subject[0].value;
      console.log(subjectFilter)
      refinedFilters['subject.name'] = [{matchMode: MatchMode.CONTAINS, value: subjectFilter, operator: Operator.AND}];
      delete refinedFilters.subject;
    }

    return refinedFilters;
  }

  private disableEditIfNecessary() {
    const createdDate = this.selectedSession?.createdDate;
    const currentDate = new Date();

    if (createdDate) {
      const diffTime = Math.abs(currentDate.getTime() - new Date(createdDate).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      this.disableEdit = diffDays > 1;
    } else {
      this.disableEdit = false;
    }
  }

}
