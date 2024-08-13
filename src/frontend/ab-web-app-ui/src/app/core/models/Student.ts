import {User} from "./User";
import {SchoolType} from "./SchoolType";
import {SchoolYear} from "./SchoolYear";
import {SessionDto} from "./session";

export interface Student extends User{
  schoolType?:SchoolType,
  schoolYear?:SchoolYear,
  sessions?:SessionDto[]
}
