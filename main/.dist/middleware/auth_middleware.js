"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const api_exceptions_1 = require("../exteptions/api_exceptions");
const token_service_1 = require("../services/token_service");
function passport(req, res, next) {
    try {
        const auth_header = req.headers.authorization;
        if (!auth_header)
            return next(api_exceptions_1.ApiError.unauthorizedError());
        const access_token = auth_header.split(' ')[1];
        if (!access_token)
            return next(api_exceptions_1.ApiError.unauthorizedError());
        const user_data = (0, token_service_1.validateAccessToken)(access_token);
        if (!user_data)
            return next(api_exceptions_1.ApiError.unauthorizedError());
        req.user = user_data;
        next();
    }
    catch (e) {
        return next(api_exceptions_1.ApiError.unauthorizedError());
    }
}
exports.passport = passport;
//# sourceMappingURL=auth_middleware.js.map