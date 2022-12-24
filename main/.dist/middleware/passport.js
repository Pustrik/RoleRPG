"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_exceptions_1 = __importDefault(require("../exteptions/api_exceptions"));
const token_service_1 = require("../services/token_service");
function passport(req, res, next) {
    try {
        const auth_header = req.headers.authorization;
        if (!auth_header)
            return next(api_exceptions_1.default.unauthorizedError());
        const access_token = auth_header.split(' ')[1];
        if (!access_token)
            return next(api_exceptions_1.default.unauthorizedError());
        const user_data = (0, token_service_1.validateAccessToken)(access_token);
        if (!user_data)
            return next(api_exceptions_1.default.unauthorizedError());
        req.user = user_data;
        next();
    }
    catch (e) {
        return next(api_exceptions_1.default.unauthorizedError());
    }
}
exports.default = passport;
//# sourceMappingURL=passport.js.map