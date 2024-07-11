import {Role} from "./Role";

export interface Register{
  username:string;
  email:string;
  password:string;
  roles:Role[];
}
