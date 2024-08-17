import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FullCalendarModule} from "@fullcalendar/angular";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {PrimeTemplate} from "primeng/api";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {SessionService} from "../../core/service/session.service";

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
    ReactiveFormsModule
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent implements  OnInit{
  calendarOptions: CalendarOptions = {};
  events: any[] = [];
  today: string = '';
  showDialog: boolean = false;
  clickedEvent: EventInput | null = null;
  view: 'display' | 'edit' | 'new' = 'display';
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder,private sessionService:SessionService) {
  }

  ngOnInit(): void {
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
      events: [
        {title: 'event 1', date: '2024-08-01', backgroundColor: "red"},
        {title: 'event 2', date: '2024-08-02'}
      ]
    };

    this.initializeForm();
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      location: [''],
      description: [''],
      start: ['', Validators.required],
      end: ['', Validators.required],
      tag: [null]
    });
  }

  onEventClick(e: any) {
    this.clickedEvent = e.event.toPlainObject();
    this.view = 'display';
    this.showDialog = true;
    if (this.clickedEvent)
      this.eventForm.patchValue({
        title: this.clickedEvent.title,
        location: this.clickedEvent.extendedProps?.['location'],
        description: this.clickedEvent.extendedProps?.['description'],
        start: this.clickedEvent.start,
        end: this.clickedEvent.end || this.clickedEvent.start,
        tag: this.clickedEvent.extendedProps?.['tag']
      });
  }

  handleSave() {
    if (this.eventForm.invalid) {
      return;
    }

    const formValue = this.eventForm.value;

    this.clickedEvent = {
      ...this.clickedEvent,
      title: formValue.title,
      start: formValue.start,
      end: formValue.end,
      backgroundColor: formValue.tag.color,
      borderColor: formValue.tag.color,
      extendedProps: {
        location: formValue.location,
        description: formValue.description,
        tag: formValue.tag
      }
    };

    if (this.clickedEvent.id) {
      this.updateEvent();
    } else {
      this.addNewEvent();
    }

    this.showDialog = false;
    this.resetEvent();
  }

  updateEvent() {
    this.events = this.events.map(event => event.id === this.clickedEvent?.id ? {...this.clickedEvent} : event);
    this.updateCalendarEvents();
  }

  addNewEvent() {
    const newEvent = {...this.clickedEvent, id: Math.floor(Math.random() * 10000)};
    this.events = [...this.events, newEvent];
    this.updateCalendarEvents();
  }

  updateCalendarEvents() {
    this.calendarOptions = {...this.calendarOptions, events: this.events};
  }

  onEditClick() {
    this.view = 'edit';
  }

  resetEvent() {
    this.clickedEvent = null;
    this.eventForm.reset();
  }

  private onDateSelect(e: DateSelectArg) {
    this.view = 'new'
    this.showDialog = true;
   // this.clickedEvent = { ...e, title: null, description: null, location: null, backgroundColor: null, borderColor: null, textColor: null, tag: { color: null, name: null } };
  }
}
