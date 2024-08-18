import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { PrimeTemplate } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { SessionService } from '../../core/service/session.service';
import { SessionDto } from '../../core/models/session';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgClass } from '@angular/common';
import { Subject } from '../../core/models/subject';
import { Teacher } from '../../core/models/teacher';
import { TeacherService } from '../../core/service/teacher.service';
import { SubjectService } from '../../core/service/subject.service';
import { NotificationService } from '../../core/service/notification.service';

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
    NgClass
  ],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  calendarOptions: CalendarOptions = {};
  events: any[] = [];
  today: string = '';
  showDialog: boolean = false;
  clickedEvent: EventInput | null = null;
  view: 'display' | 'edit' | 'new' = 'display';
  sessionForm!: FormGroup;
  selectedSession: SessionDto | null = null;
  title: string = "";
  subjects!: { label: string, value: Subject }[]
  teachers!: { label: string, value: Teacher }[]
  sessions!: SessionDto[];

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadSessions();  // Load sessions when the component initializes
    this.teacherService.getALL().subscribe(
      result => this.teachers = result.map(u => ({
        label: `${u.firstName} ${u.lastName}`,
        value: u
      }))
    );
    this.subjectService.getALL().subscribe(
      result => this.subjects = result.map(u => ({
        label: u.name,
        value: u
      }))
    );
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

  initializeForm() {
    this.sessionForm = this.fb.group({
      startDateTime: ['', Validators.required],
      teacher: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }

  loadSessions() {
    this.sessionService.getCurrentUserSessions().subscribe(
      sessions => {
        this.sessions = sessions;
        this.events = sessions.map(session => ({
          title: session.title,
          start: session.startDateTime,
          end: session.endDateTime
        }));
        console.log(this.events)
        this.updateCalendarEvents();
      },
    );
  }

  onEventClick(e: EventClickArg) {
    this.clickedEvent = e.event.toPlainObject();
    this.view = 'display';
    this.showDialog = true;
    if (this.clickedEvent) {
      this.sessionForm.patchValue({
        title: this.clickedEvent.title,
        location: this.clickedEvent.extendedProps?.['location'],
        description: this.clickedEvent.extendedProps?.['description'],
        start: this.clickedEvent.start,
        end: this.clickedEvent.end || this.clickedEvent.start,
      });
    }
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

  updateSession() {
    this.updateCalendarEvents();
  }

  addNewSession() {
    const formValue = this.sessionForm.value;
    this.sessionService.save(formValue).subscribe(
      () => {
        this.showDialog = false;
        this.sessionForm.reset();
        this.notificationService.showSuccess('Subject saved successfully');
        this.loadSessions();  // Refresh the sessions list
      }
    );
  }

  updateCalendarEvents() {
    this.calendarOptions = { ...this.calendarOptions, events: this.events };
  }

  onEditClick() {
    this.view = 'edit';
  }

  resetEvent() {
    this.clickedEvent = null;
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
