import {User} from "./user";

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    roles: string[];
    user: User
}
