import {IUser} from "../models/i_user";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/auth_service";
import axios from "axios";
import {AuthResponse} from "../models/response/auth_response";
import {API_URL} from "../http";
import {Socket} from "socket.io-client";

export default class Store_http {
    user = {} as IUser;
    is_auth = false;
    is_loading = false;
    socket = '';
    is_connected = false;
    constructor() {
        makeAutoObservable(this);
    }
    setSocket(socket: string) {
        this.socket = socket;
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
    setConnected(bool: boolean) {
        this.is_auth = bool;
    }
    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(username: string, email: string, password: string, password_d: string, class_id: number) {
        try {
            const response = await AuthService.registration(username, email, password, password_d, class_id);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async changeUserData(username: string, password: string, password_d: string, password_old: string, class_id: number) {
        try {
            const response = await AuthService.changeUserData(this.user.id, username, password, password_d, password_old, class_id);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e);
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