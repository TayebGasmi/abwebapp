import { Component } from '@angular/core';
import {Session} from "../../../core/models/session";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";
import {ToggleButtonModule} from "primeng/togglebutton";
import {RippleModule} from "primeng/ripple";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-sessionlist',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule
  ],
  templateUrl: './sessionlist.component.html',
  styleUrl: './sessionlist.component.scss'
})
export class SessionlistComponent {
  sessions: Session[] = [
    {
      sessionId: 1,
      title: 'Introduction to Angular',
      description: 'Learn the basics of Angular framework.',
      startTime: new Date(),
      endTime: new Date(),
      duration: '2 hours',
      instructorName: 'John Doe',
      courseName: 'Angular Basics',
      sessionType: 'Online',
      location: 'Zoom',
      sessionLink: 'https://zoom.us/j/1234567890',
      materials: 'Presentation, Code Examples',
      capacity: 100,
      registeredParticipants: 50,
      sessionStatus: 'Scheduled',
      recordingLink: '',
      feedback: '',
      tags: ['Angular', 'Beginner']
    },
    // Add more sessions as needed
  ];

  constructor() { }

  ngOnInit(): void { }
  editSession(session: Session) {
    // Logic to edit the session
    console.log('Editing session:', session);
  }

  deleteSession(sessionId: number) {
    // Logic to delete the session
    this.sessions = this.sessions.filter(session => session.sessionId !== sessionId);
    console.log('Deleted session with ID:', sessionId);
  }
}
