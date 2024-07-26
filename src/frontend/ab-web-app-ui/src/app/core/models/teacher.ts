import {User} from "./User";
import {School} from "./School";

export interface Teacher {
  userDto:User,
  teachingYears:number[],
  school:School
}
