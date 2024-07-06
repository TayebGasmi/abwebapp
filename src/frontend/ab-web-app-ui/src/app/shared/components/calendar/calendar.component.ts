import {Component, OnInit} from '@angular/core';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CalendarOptions} from "@fullcalendar/core";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {};
  
  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (arg: any) => this.handleDateClick(arg),
      events: [
        { title: 'event 1', date: '2024-04-01' },
        { title: 'event 2', date: '2024-04-02' }
      ]
    };
  }

  handleDateClick(arg: any) {
    console.log('date click! ' + arg)
  }
}
