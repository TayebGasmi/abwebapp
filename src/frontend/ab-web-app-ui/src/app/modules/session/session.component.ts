import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {ButtonDirective} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FullCalendarModule} from '@fullcalendar/angular';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {MultiSelectModule} from 'primeng/multiselect';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import {StepsModule} from 'primeng/steps';
import {Ripple} from 'primeng/ripple';
import {MenuItem} from 'primeng/api';
import {SessionService} from '../../core/service/session.service';
import {TeacherService} from '../../core/service/teacher.service';
import {SubjectService} from '../../core/service/subject.service';
import {NotificationService} from '../../core/service/notification.service';
import {AuthService} from "../../core/service/auth.service";
import {SessionDto} from '../../core/models/session';
import {Subject} from '../../core/models/subject';
import {Teacher} from '../../core/models/teacher';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    ButtonDirective,
    CalendarModule,
    DialogModule,
    DropdownModule,
    FullCalendarModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    MultiSelectModule,
    NgClass,
    DatePipe,
    CurrencyPipe,
    StepsModule,
    Ripple
  ],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit, OnDestroy {

  calendarOptions: CalendarOptions = {};
  events: EventInput[] = [];
  showDialog = false;
  view: 'display' | 'edit' | 'new' = 'display';
  sessionForm!: FormGroup;
  selectedSession: SessionDto | null = null;
  title = '';
  subjects: { label: string, value: Subject }[] = [];
  teachers: { label: string, value: Teacher }[] = [];
  disableEdit = false;
  sessionSteps: MenuItem[] = [];
  activeStep = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
    this.setupCalendarOptions();
    this.initializeSteps();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  private initializeForm() {
    this.sessionForm = this.fb.group({
      startDateTime: ['', Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }

  private loadInitialData() {
    this.loadTeachers();
    this.loadSubjects();
  }

  private loadTeachers() {
    /*  this.subscriptions.push(
        this.sessionForm.get('subject')?.valueChanges
        .pipe(
          debounceTime(300),
          map(subject => subject?.name),
          distinctUntilChanged(),
          switchMap(subjectName => subjectName ? this.teacherService.getTeachersBySubjectName(subjectName) : of([]))
        )
        .subscribe(teachers => {
          this.teachers = teachers.map(teacher => ({
            label: `${teacher.firstName} ${teacher.lastName}`,
            value: teacher
          }));
        });
    )*/

  }

  private loadSubjects() {
    this.subscriptions.push(
      this.subjectService.getCurrentUserSubject().subscribe(subjects => {
        this.subjects = subjects.map(subject => ({
          label: subject.name,
          value: subject
        }));
      })
    )
  }

  private setupCalendarOptions() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: this.onEventClick.bind(this),
      select: this.onDateSelect.bind(this),
      events: this.events,
      datesSet: this.onDateRangeChange.bind(this)
    };
  }

  private initializeSteps() {
    this.sessionSteps = [
      {label: 'Choose Subject & Time'},
      {label: 'Choose Teacher'}
    ];
  }

  private loadSessions(startDate: string = '', endDate: string = '') {
    this.subscriptions.push(
      this.sessionService.getCurrentUserSessionByDateRange(startDate, endDate).subscribe(sessions => {
        this.events = sessions.map(this.mapSessionToEvent);
        this.updateCalendarEvents();
      })
    )

  }

  private mapSessionToEvent(session: SessionDto): EventInput {
    return {
      id: session.id.toString(),
      title: session.title,
      start: session.startDateTime,
      end: session.endDateTime,
      extendedProps: {
        description: session.description,
        meetingLink: session.meetingLink,
        price: session.price,
        duration: session.duration,
        status: session.status,
        teacher: session.teacher,
        subject: session.subject,
        createdDate: new Date(session.createdDate)
      }
    };
  }

  private updateCalendarEvents() {
    if (this.calendarOptions.events !== this.events) {
      this.calendarOptions = {...this.calendarOptions, events: this.events};
    }
  }

  private onDateRangeChange(viewInfo: any) {
    this.loadSessions(viewInfo.startStr, viewInfo.endStr);
  }

  onEditClick() {
    this.view = 'edit';
  }

  nextStep() {
    if (this.activeStep === 0 && this.isFirstStepInvalid()) {
      return;
    }
    this.activeStep++;
  }

  prevStep() {
    this.activeStep--;
  }

  private isFirstStepInvalid(): boolean {
    if (this.sessionForm.get('subject')?.invalid) {
      this.notificationService.showError("Please choose a subject.");
      return true;
    }
    if (this.sessionForm.get('startDateTime')?.invalid) {
      this.notificationService.showError("Please select a start time.");
      return true;
    }
    return false;
  }

  isNextDisabled(): boolean {
    return this.activeStep === 0 && this.isFirstStepInvalid();
  }

  isLastStep(): boolean {
    return this.activeStep === this.sessionSteps.length - 1;
  }

  handleSave() {
    if (this.sessionForm.invalid) {
      return;
    }

    this.selectedSession ? this.updateSession() : this.addNewSession();
    this.showDialog = false;
    this.resetEvent();
  }

  private addNewSession() {
    this.subscriptions.push(
      this.sessionService.save(this.sessionForm.value).subscribe(() => {
        this.notificationService.showSuccess('Session saved successfully');
        this.loadSessions();
      })
    )

  }

  private updateSession() {
    const updatedSession = {...this.selectedSession, ...this.sessionForm.value};
    this.subscriptions.push(
      this.sessionService.update(updatedSession).subscribe(() => {
        this.notificationService.showSuccess('Session updated successfully');
        this.loadSessions();
      })
    )

  }

  resetEvent() {
    this.selectedSession = null;
    this.sessionForm.reset();
  }

  fieldHasError(fieldName: string): boolean {
    const control = this.sessionForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  private onEventClick(eventClick: EventClickArg) {
    if (this.authService.hasRoles(["TEACHER"])) {
      return;
    }

    this.selectedSession = this.mapEventToSession(eventClick);
    this.title = this.selectedSession.title;
    this.disableEditIfNecessary();
    this.view = 'display';
    this.showDialog = true;
  }

  private mapEventToSession(eventClick: EventClickArg): SessionDto {
    return {
      id: parseInt(eventClick.event.id),
      status: '',
      title: eventClick.event.title || '',
      startDateTime: eventClick.event.start || new Date(),
      endDateTime: eventClick.event.end || new Date(),
      description: eventClick.event.extendedProps['description'] || '',
      meetingLink: eventClick.event.extendedProps['meetingLink'] || '',
      price: eventClick.event.extendedProps['price'] || 0,
      duration: eventClick.event.extendedProps['duration'] || 0,
      teacher: eventClick.event.extendedProps['teacher'],
      subject: eventClick.event.extendedProps['subject'],
      createdDate: eventClick.event.extendedProps['createdDate']
    };
  }

  private disableEditIfNecessary() {
    const createdDate = this.selectedSession?.createdDate;
    const currentDate = new Date();

    // Implement logic for disabling edit based on the createdDate
  }

  private onDateSelect(selectInfo: DateSelectArg) {
    console.log("hh")
    //this.resetEvent();
    // this.title = 'New Session';
    //this.view = 'new';
    //this.showDialog = true;
    //this.sessionForm.patchValue({startDateTime: selectInfo.start});
  }

}
