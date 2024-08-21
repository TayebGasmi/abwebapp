import {Teacher} from "./teacher";
import {Student} from "./student";
import {Subject} from "./subject";

export interface SessionDto {
  id: number;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  meetingLink?: string;
  price: number;
  duration: number;
  status: string;
  teacher?:Teacher;
  student?:Student;
  subject:Subject;
  createdDate:Date;

}
