import {User} from "./user";
import {Subject} from "./subject"
export interface Teacher extends User{
  payRate?:number,
  subjects?:Subject[],
  confirmedByAdmin?:boolean,
}
