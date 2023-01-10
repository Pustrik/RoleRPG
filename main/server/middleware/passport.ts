import ApiError from "../exteptions/api-exceptions";
import {validateAccessToken} from "../services/token-service";

function passport(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader)
            return next(ApiError.unauthorizedError());

        const access_token = authHeader.split(' ')[1];
        if(!access_token)
            return next(ApiError.unauthorizedError());

        const userData = validateAccessToken(access_token);
        if(!userData)
            return next(ApiError.unauthorizedError());

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
}
export default passport;