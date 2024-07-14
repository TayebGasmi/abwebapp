import {Role} from "./Role";

export interface Register {
  email: string;
  firstName: string ;
  lastName:string ;
  password: string;
  roles: Role[];
}
