"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers = __importStar(require("../controllers/auth"));
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("../middleware/passport"));
const auth_router = express_1.default.Router();
auth_router.post('/login', controllers.loginPost);
auth_router.post('/registration', (0, express_validator_1.body)('username').isLength({ min: 1, max: 15 }), (0, express_validator_1.body)('password').isLength({ min: 1, max: 15 }), (0, express_validator_1.body)('password_d').custom((value, { req }) => {
    if (value.toString() != req.body.password.toString())
        return Promise.reject('Не равны пароли');
    return true;
}), (0, express_validator_1.body)('email').isEmail(), controllers.registrationPost);
auth_router.post('/logout', controllers.logoutPost);
auth_router.get('/refresh', controllers.refreshGet);
auth_router.get('/users', passport_1.default, controllers.allUsersGet);
exports.default = auth_router;
//# sourceMappingURL=auth.js.map