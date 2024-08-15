import {User} from "./User";

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  roles: string[];
  user: User
}
