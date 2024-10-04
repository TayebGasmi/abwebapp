import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FullCalendarModule} from '@fullcalendar/angular';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {SessionService} from '../../core/service/session.service';
import {SessionDto} from '../../core/models/session';
import {NgClass} from '@angular/common';
import {NotificationService} from '../../core/service/notification.service';
import {AuthService} from "../../core/service/auth.service";
import {Ripple} from "primeng/ripple";
import {DeleteConfirmationComponent} from "../../shared/components/delete-confirmation/delete-confirmation.component";
import {RoleName} from "../../core/models/role";
import {PaymentComponent} from "../payment/payment.component";
import {SessionAddComponent} from "./session-add/session-add.component";
import {SessionDetailsComponent} from "./session-details/session-details.component";
import {CalendarModule} from "primeng/calendar";
import {SessionStatus} from "../../core/enum/session-status";
import {RxStompService} from "../../core/service/rx-stomp.service";
import {map, Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-session-calender',
  standalone: true,
  imports: [
    ButtonDirective,
    DialogModule,
    DropdownModule,
    FullCalendarModule,
    NgClass,
    Ripple,
    DeleteConfirmationComponent,
    PaymentComponent,
    SessionAddComponent,
    SessionDetailsComponent,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './session-calendar.component.html',
  styleUrls: ['./session-calender.component.scss']
})
export class SessionCalenderComponent implements OnInit, OnDestroy {

  calendarOptions: CalendarOptions = {};
  events: EventInput[] = [];
  showDialog = false;
  view: 'display' | 'edit' | 'new' = 'display';
  selectedSession: SessionDto | null = null;
  title = '';
  disableEdit = false;
  startDate = "";
  endDate = "";
  sessionEditStartTime = new FormControl<any>(null, Validators.required);
  showCancelSession: boolean = false
  currentDate = new Date();
  isTeacher = false
  Subscriptions: Subscription[] = []
  selectedStartDateTime!: Date
  protected readonly SessionStatus = SessionStatus;

  constructor(
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private rxStompService: RxStompService
  ) {
    this.isTeacher = this.authService.hasRoles([RoleName.TEACHER])
  }

  ngOnInit(): void {
    this.setupCalendarOptions();
    this.getSessionFormWs();

  }

  handleSave() {

    if (this.sessionEditStartTime.invalid) return;
    this.updateSession();
    this.showDialog = false;
    this.resetEvent();
  }

  onEditClick() {
    this.view = 'edit';
    this.title = `edit ${this.selectedSession?.title}`
    this.sessionEditStartTime.patchValue(this.selectedSession?.startDateTime)
  }

  resetEvent() {
    this.selectedSession = null;

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

  private loadSessions() {
    this.sessionService.getCurrentUserSessionByDateRange(this.startDate, this.endDate).subscribe(sessions => {
      this.events = sessions.map(this.mapSessionToEvent);
      this.updateCalendarEvents();
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
      datesSet: (dateInfo) => this.onDateRangeChange(dateInfo),
    };
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

  private onEventClick(e: EventClickArg) {

    this.selectedSession = {
      id: parseInt(e.event.id),
      status: e.event.extendedProps['status'],
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

  private onDateSelect(selectInfo: DateSelectArg) {

    if (this.authService.hasRoles(["TEACHER"])) {
      return;
    }
    const now = new Date()
    if (selectInfo.start < now) {
      if (selectInfo.start.toDateString() === now.toDateString()) {
        this.selectedStartDateTime = now
      } else return;
    }
    this.selectedStartDateTime = (selectInfo.start)
    this.resetEvent();
    this.showDialog = true;
    this.view = 'new';
    this.title = 'New Session';
  }

  private getSessionFormWs() {
    this.Subscriptions.push(
      this.rxStompService.watch("/session").pipe(
        map((message) => JSON.parse(message.body)),
        filter((session: SessionDto) => this.isSessionInTheValidDateRange(session))
      ).subscribe(
        (newSession: SessionDto) => this.addSessionFromWebSocket(newSession)
      )
    );
  }

  private isSessionInTheValidDateRange(newSession: SessionDto): boolean {
    return new Date(this.startDate) <= new Date(newSession.startDateTime) && new Date(this.endDate) >= new Date(newSession.endDateTime);
  }

  private addSessionFromWebSocket(newSession: SessionDto) {
    const newEvent = this.mapSessionToEvent(newSession);

    this.events = [...this.events, newEvent];
    this.updateCalendarEvents()
    this.notificationService.showSuccess("New session added");
  }
}
