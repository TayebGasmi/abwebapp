import {Role} from "./Role";

export interface Register {
  email: string;
  password: string;
  roles: Role[];
}
