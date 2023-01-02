import {IUser} from "../models/i-user";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/auth-service";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/auth-response";
import {API_URL} from "../http";

export default class StoreHttp {
    user = {} as IUser;
    is_auth = false;
    is_loading = false;
    constructor() {
        makeAutoObservable(this);
    }
    setLoading(bool: boolean) {
        this.is_loading = bool;
    }
    setUser(user: IUser) {
        this.user = user;
    }
    setAuth(bool: boolean) {
        this.is_auth = bool;
    }
    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e);
            alert(e.response.data.message)
        }
    }

    async registration(username: string, email: string, password: string, password_d: string, class_id: number) {
        try {
            const response = await AuthService.registration(username, email, password, password_d, class_id);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e);
            alert(e.response.data.message)
        }
    }

    async changeUserData(username: string, password: string, password_d: string, password_old: string, class_id: number) {
        try {
            const response = await AuthService.changeUserData(this.user.id, username, password, password_d, password_old, class_id);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e);
            alert(e.response.data.message)
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e);
            alert(e.response.data.message)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
}