import {Role} from "./role";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  roles: Role[];
  isCompleted: boolean;
}
