"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const auth_service_1 = __importDefault(require("../services/auth_service"));
class Store {
    constructor() {
        this.user = {};
        this.isAuth = false;
        (0, mobx_1.makeAutoObservable)(this);
    }
    setAuth(bool) {
        this.isAuth = bool;
    }
    setUser(user) {
        this.user = user;
    }
    async login(username, password) {
        var _a, _b;
        try {
            const response = await auth_service_1.default.login(username, password);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e) {
            // @ts-ignore
            console.log((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
        }
    }
    async registration(username, password) {
        var _a, _b;
        try {
            const response = await auth_service_1.default.registration(username, password);
            localStorage.setItem('token', response.data.access_token);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e) {
            // @ts-ignore
            console.log((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
        }
    }
    async logout() {
        var _a, _b;
        try {
            const response = await auth_service_1.default.logout();
            localStorage.removeItem('token');
            console.log(response);
            this.setAuth(false);
            this.setUser({});
        }
        catch (e) {
            // @ts-ignore
            console.log((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
        }
    }
}
exports.default = Store;
//# sourceMappingURL=store.js.map