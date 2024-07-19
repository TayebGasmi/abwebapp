import {Role} from "./Role";

export interface User{
  firstName:string;
  lastName:string;
  email:string;
  roles:Role[];

}
