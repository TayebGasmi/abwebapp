import {SessionDto} from "./session";

export interface Payment{
  session:SessionDto,
  teacherShare:number,
  adminShare:number,
  total:number,
  isTeacherPaid:boolean
}
