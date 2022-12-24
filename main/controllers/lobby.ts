import {Result, ValidationError, validationResult} from "express-validator";
import ApiError from "../exteptions/api_exceptions";
import {changeUserData} from "../services/user_service";

export async function changeUserDataPut(req, res, next) {
    try {
        const errors: Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty())
            return next(ApiError.badRequest('Ошибка валидации', errors.array()));
        const {id, username, password, password_d, password_old, class_id} = req.body;
        const user_data = await changeUserData(id, username, password, password_d, password_old, class_id);
        res.cookie('refresh_token', user_data.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return res.status(200).json(user_data);
    } catch (e) {
        next(e);
    }
}