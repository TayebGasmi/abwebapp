import {User} from "./user";

export interface FileDto{
  id: number,
  fileName: string,
  fileUrl: string,
  user:User
}
