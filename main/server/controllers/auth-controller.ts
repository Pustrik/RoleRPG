import {Result, ValidationError, validationResult} from "express-validator";
import ApiError from "../exteptions/api-exceptions";
import {login, registration, logout, refresh, allActiveUsers} from "../services/user-service"
export async function loginPost(req, res, next) {
    try {
        const {username, password} = req.body;
        const userData = await login(username, password);
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 60*60*100, httpOnly: true});
        return res.status(200).json(userData);
    } catch (e) {
        next(e);
    }
}

export async function registrationPost(req, res, next) {
    try {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty())
            return next(ApiError.badRequest('Ошибка валидации', errors.array()));
        const {username, email, password, class_id} = req.body;
        const userData = await registration(username, email, password, class_id);
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return res.status(200).json(userData);
    } catch (e) {
        next(e);
    }
}

export async function logoutPost(req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const token = await logout(refreshToken);
        res.clearCookie('refresh_token');
        return res.json(token);
    } catch (e) {
        next(e);
    }
}

export async function refreshGet(req, res, next) {
    try {
        const refreshToken: string = req.cookies.refresh_token;
        const userData = await refresh(refreshToken);
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export async function allUsersGet(req, res, next) {
    try {
        const users = await allActiveUsers();
        return res.json(users);
    } catch (e) {
        next(e);
    }
}