import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FullCalendarModule} from '@fullcalendar/angular';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {MenuItem} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {SessionService} from '../../core/service/session.service';
import {SessionDto} from '../../core/models/session';
import {MultiSelectModule} from 'primeng/multiselect';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import {Subject} from '../../core/models/subject';
import {Teacher} from '../../core/models/teacher';
import {TeacherService} from '../../core/service/teacher.service';
import {SubjectService} from '../../core/service/subject.service';
import {NotificationService} from '../../core/service/notification.service';
import {AuthService} from "../../core/service/auth.service";
import {StepsModule} from "primeng/steps";
import {Ripple} from "primeng/ripple";
import {distinctUntilChanged, map, of, switchMap} from "rxjs";
import {filter} from "rxjs/operators";

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
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
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
  startDate = "";
  endDate = "";
  sessionEditStartTime = new FormControl<any>(null, Validators.required);

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

  private initializeForm() {
    this.sessionForm = this.fb.group({
      startDateTime: [null, Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }

  private loadInitialData() {
    this.loadTeachers();
    this.loadSubjects();
  }

  private loadSessions() {
    this.sessionService.getCurrentUserSessionByDateRange(this.startDate, this.endDate).subscribe(sessions => {
      this.events = sessions.map(this.mapSessionToEvent);
      this.updateCalendarEvents();
    });
  }

  private loadTeachers() {
    this.sessionForm.get('subject')?.valueChanges
    .pipe(
      filter(subject => !!subject),
      map(subject => subject.name),
      distinctUntilChanged(),
      switchMap(subjectName => subjectName ? this.teacherService.getTeachersBySubjectName(subjectName) : of([]))
    )
    .subscribe(teachers => {
      this.teachers = teachers.map(teacher => ({
        label: `${teacher.firstName} ${teacher.lastName}`,
        value: teacher
      }));
    });
  }

  private loadSubjects() {
    this.subjectService.getCurrentUserSubject().subscribe(subjects => {
      this.subjects = subjects.map(subject => ({
        label: subject.name,
        value: subject
      }));
    });
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
      eventClick: (e: EventClickArg) => this.onEventClick(e),
      select: (e: DateSelectArg) => this.onDateSelect(e),
      events: this.events,
      datesSet: (dateInfo) => this.onDateRangeChange(dateInfo)
    };
  }

  private initializeSteps() {
    this.sessionSteps = [
      {label: 'Choose Subject & Time'},
      {label: 'Choose Teacher'}
    ];
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

  handleSave() {

    if (this.view === 'new') {
      if (this.sessionForm.invalid) return
      this.addNewSession();
    } else {
      if (this.sessionEditStartTime.invalid) return;
      this.updateSession();

    }
    this.showDialog = false;
    this.resetEvent();
  }

  private addNewSession() {
    this.sessionService.save(this.sessionForm.value).subscribe(() => {
      this.notificationService.showSuccess('Session saved successfully');
      this.loadSessions();
    });
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

  private updateCalendarEvents() {
    this.calendarOptions = {...this.calendarOptions, events: this.events};
  }

  private onDateRangeChange(viewInfo: any) {
    this.startDate = viewInfo.startStr
    this.endDate = viewInfo.endStr
    this.loadSessions();
  }

  onEditClick() {
    this.view = 'edit';
    this.title = `edit ${this.selectedSession?.title}`
    this.sessionEditStartTime.patchValue(this.selectedSession?.startDateTime)
  }

  resetEvent() {
    this.selectedSession = null;
    this.sessionForm.reset();
    this.activeStep = 0;

  }

  fieldHasError(fieldName: string): boolean {
    const control = this.sessionForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  isLastStep(): boolean {
    return this.activeStep === this.sessionSteps.length - 1;
  }

  private onEventClick(e: EventClickArg) {
    if (this.authService.hasRoles(["TEACHER"])) {
      return;
    }

    this.selectedSession = {
      id: parseInt(e.event.id),
      status: '',
      title: e.event.title || '',
      startDateTime: e.event.start || new Date(),
      endDateTime: e.event.end || new Date(),
      description: e.event.extendedProps['description'] || '',
      meetingLink: e.event.extendedProps['meetingLink'] || '',
      price: e.event.extendedProps['price'] || 0,
      duration: e.event.extendedProps['duration'] || 0,
      teacher: e.event.extendedProps['teacher'],
      subject: e.event.extendedProps['subject'],
      createdDate: e.event.extendedProps['createdDate']
    };

    this.title = this.selectedSession.title;
    this.disableEditIfNecessary();
    this.view = 'display';
    this.showDialog = true;
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


  get sessionSubject() {
    return this.sessionForm.get("subject")
  }

  get sessionStartDateTime() {
    return this.sessionForm.get("startDateTime")
  }

  private onDateSelect(selectInfo: DateSelectArg) {
    this.resetEvent();
    this.showDialog = true;
    this.view = 'new';
    this.title = 'New Session';
    this.sessionForm.patchValue({
      startDateTime: selectInfo.start
    });
  }
}
