import {AuthResponse} from "../models/response/auth_response";
import api from "../http";
import {IUser} from "../models/i_user";
import {AxiosResponse} from "axios";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return api.get<IUser[]>('/users');
    }
}