"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsersGet = exports.refreshGet = exports.logoutPost = exports.registrationPost = exports.loginPost = void 0;
const express_validator_1 = require("express-validator");
const api_exceptions_1 = __importDefault(require("../exteptions/api_exceptions"));
const user_service_1 = require("../services/user_service");
async function loginPost(req, res, next) {
    try {
        const { username, password } = req.body;
        const user_data = await (0, user_service_1.login)(username, password);
        res.cookie('refresh_token', user_data.refresh_token, { maxAge: 60 * 60 * 100, httpOnly: true });
        return res.status(200).json(user_data);
    }
    catch (e) {
        next(e);
    }
}
exports.loginPost = loginPost;
async function registrationPost(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return next(api_exceptions_1.default.badRequest('Ошибка валидации', errors.array()));
        const { username, email, password, class_id } = req.body;
        const user_data = await (0, user_service_1.registration)(username, email, password, class_id);
        res.cookie('refresh_token', user_data.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(200).json(user_data);
    }
    catch (e) {
        next(e);
    }
}
exports.registrationPost = registrationPost;
async function logoutPost(req, res, next) {
    try {
        const { refresh_token } = req.cookies;
        const token = await (0, user_service_1.logout)(refresh_token);
        res.clearCookie('refresh_token');
        return res.json(token);
    }
    catch (e) {
        next(e);
    }
}
exports.logoutPost = logoutPost;
async function refreshGet(req, res, next) {
    try {
        const refresh_token = req.cookies.refresh_token;
        const user_data = await (0, user_service_1.refresh)(refresh_token);
        res.cookie('refresh_token', user_data.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(user_data);
    }
    catch (e) {
        next(e);
    }
}
exports.refreshGet = refreshGet;
async function allUsersGet(req, res, next) {
    try {
        const users = await (0, user_service_1.allActiveUsers)();
        return res.json(users);
    }
    catch (e) {
        next(e);
    }
}
exports.allUsersGet = allUsersGet;
//# sourceMappingURL=auth.js.map