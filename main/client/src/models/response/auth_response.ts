import {IUser} from "../i_user";

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: IUser;
}