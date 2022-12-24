"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("../http"));
class AuthService {
    static async login(username, password) {
        return http_1.default.post('/login', { username, password });
    }
    static async registration(username, password) {
        console.log(username, password);
        return http_1.default.post('/registration', { username, password });
    }
    static async logout() {
        return http_1.default.post('/logout');
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth_service.js.map