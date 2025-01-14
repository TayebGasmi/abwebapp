import {Teacher} from "./teacher";
import {Student} from "./student";
import {Subject} from "./subject";
import {SessionStatus} from "../enum/session-status";



export interface SessionDto {
  id: number;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  meetingLink?: string;
  price: number;
  duration: number;
  status: SessionStatus;
  teacher?:Teacher;
  student?:Student;
  subject:Subject;
  createdDate:Date;

}
