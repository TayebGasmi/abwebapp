import {User} from "./User";
import {Subject} from "./subject"

export interface Teacher {
  user: User,
  payRate: number,
  subjects: Subject[]
}
