import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FullCalendarModule} from '@fullcalendar/angular';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {PrimeTemplate} from 'primeng/api';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
    PrimeTemplate,
    ReactiveFormsModule,
    MultiSelectModule,
    NgClass,
    DatePipe,
    CurrencyPipe
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

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadSessions();
    this.loadTeachers();
    this.loadSubjects();
    this.setupCalendarOptions();
  }

  private initializeForm() {
    this.sessionForm = this.fb.group({
      startDateTime: ['', Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }

  private loadSessions() {
    this.sessionService.getCurrentUserSessions().subscribe(sessions => {
      this.events = sessions.map(session => ({
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
          subject: session.subject
        }
      }));
      this.updateCalendarEvents();
    });
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
      events: this.events
    };
  }

  private onEventClick(e: EventClickArg) {
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
      teacher: e.event.extendedProps['teacher'] ,
      subject:e.event.extendedProps['subject']
    };
    this.view = 'display';
    this.showDialog = true;
    this.title = this.selectedSession.title;
  }

  handleSave() {
    if (this.sessionForm.invalid) {
      return;
    }
    if (this.selectedSession) {
      this.updateSession();
    } else {
      this.addNewSession();
    }
    this.showDialog = false;
    this.resetEvent();
  }

  private addNewSession() {
    const formValue = this.sessionForm.value;
    this.sessionService.save(formValue).subscribe(() => {
      this.notificationService.showSuccess('Session saved successfully');
      this.loadSessions();
    });
  }

  private updateSession() {
    if (this.selectedSession) {
      const updatedSession = {...this.selectedSession, ...this.sessionForm.value};
      this.sessionService.update(updatedSession).subscribe(() => {
        this.notificationService.showSuccess('Session updated successfully');
        this.loadSessions();
      });
    }
  }

  private updateCalendarEvents() {
    this.calendarOptions = {...this.calendarOptions, events: this.events};
  }

  onEditClick() {
    this.view = 'edit';
  }

   resetEvent() {
    this.selectedSession = null;
    this.sessionForm.reset();
  }

  private onDateSelect(dateSelectArg: DateSelectArg) {
    this.view = 'new';
    this.title = 'New session';
    this.showDialog = true;
    this.sessionForm.get('startDateTime')?.patchValue(dateSelectArg.start);
  }

  fieldHasError(fieldName: string): boolean {
    const control = this.sessionForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
}
