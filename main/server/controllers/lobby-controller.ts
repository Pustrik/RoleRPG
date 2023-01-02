import {Result, ValidationError, validationResult} from "express-validator";
import ApiError from "../exteptions/api-exceptions";
import {changeUserData} from "../services/user-service";

export async function changeUserDataPut(req, res, next) {
    try {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty())
            return next(ApiError.badRequest('Validation error', errors.array()));
        const {id, username, password, password_d, password_old, class_id} = req.body;
        const userData = await changeUserData(id, username, password, password_d, password_old, class_id);
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return res.status(200).json(userData);
    } catch (e) {
        next(e);
    }
}