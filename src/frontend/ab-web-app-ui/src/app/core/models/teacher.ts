import {User} from "./User";
import {School} from "./School";
import {Subject} from "./subject"
export interface Teacher extends User{
  payRate?:number,
  subjects?:Subject[]
}
