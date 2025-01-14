import {Component, Input} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {SessionDto} from "../../../../core/models/session";
import {SessionStatus} from "../../../../core/enum/session-status";

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss'
})
export class SessionDetailsComponent {

  @Input() selectedSession!: SessionDto;

  protected readonly SessionStatus = SessionStatus;
}
