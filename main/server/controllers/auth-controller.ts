import {Result, ValidationError, validationResult} from "express-validator";
import ApiError from "../exteptions/api-exceptions";
import {login, registration, logout, refresh, allActiveUsers} from "../services/user-service"
import {getUserByUsername} from "../services/pdb-service";
export async function loginPost(req, res, next) {
    try {
        const {username, password} = req.body;
        const userData = await login(username, password);
        const classId = await getUserByUsername(username);
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 60*60*100, httpOnly: true});
        console.info('Login POST: ' + JSON.stringify(userData) + classId.class_id);
        return res.status(200).json({...userData, class_id: classId.class_id});
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
        console.info('Registration POST: ' + JSON.stringify(userData));
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
        console.info('LogOut POST\n');
        return res.json(token);
    } catch (e) {
        next(e);
    }
}

export async function refreshGet(req, res, next) {
    try {
        const refreshToken: string = req.cookies.refresh_token;
        const userData = await refresh(refreshToken);
        const classId = await getUserByUsername(userData.user.username);
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
        console.info('Refresh GET: ' + JSON.stringify(userData));
        return res.json({...userData, class_id: classId.class_id});
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