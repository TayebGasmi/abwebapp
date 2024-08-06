import {Role} from "./Role";

export interface User{
  firstName:string;
  lastName:string;
  email:string;
  profilePicture:string;
  roles:Role[];
}
