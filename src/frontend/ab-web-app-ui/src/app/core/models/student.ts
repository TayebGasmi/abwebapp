import {User} from "./User";
import {SchoolType} from "./school-type";
import {SchoolYear} from "./school-year";
import {SessionDto} from "./session";

export interface Student extends User {
  schoolType?: SchoolType,
  schoolYear?: SchoolYear,
  sessions?: SessionDto[]
}
