import ApiError from "../exteptions/api_exceptions";
import {validateAccessToken} from "../services/token_service";

function passport(req, res, next) {
    try {
        const auth_header = req.headers.authorization;
        if(!auth_header)
            return next(ApiError.unauthorizedError());

        const access_token = auth_header.split(' ')[1];
        if(!access_token)
            return next(ApiError.unauthorizedError());

        const user_data = validateAccessToken(access_token);
        if(!user_data)
            return next(ApiError.unauthorizedError());

        req.user = user_data;
        next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
}
export default passport;