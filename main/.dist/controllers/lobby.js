"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserDataPut = void 0;
const express_validator_1 = require("express-validator");
const api_exceptions_1 = __importDefault(require("../exteptions/api_exceptions"));
const user_service_1 = require("../services/user_service");
async function changeUserDataPut(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return next(api_exceptions_1.default.badRequest('Ошибка валидации', errors.array()));
        const { id, username, password, password_d, password_old, class_id } = req.body;
        const user_data = await (0, user_service_1.changeUserData)(id, username, password, password_d, password_old, class_id);
        res.cookie('refresh_token', user_data.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(200).json(user_data);
    }
    catch (e) {
        next(e);
    }
}
exports.changeUserDataPut = changeUserDataPut;
//# sourceMappingURL=lobby.js.map