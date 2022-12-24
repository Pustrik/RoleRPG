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
exports.lobby_router = void 0;
const controllers = __importStar(require("../controllers/lobby"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middleware/passport"));
const express_validator_1 = require("express-validator");
const lobby_router = express_1.default.Router();
exports.lobby_router = lobby_router;
//lobby_router.get('/lobby', passport, controllers.lobby);
lobby_router.put('/changedata', (0, express_validator_1.body)('username').isLength({ min: 1, max: 15 }), (0, express_validator_1.body)('password_d').custom((value, { req }) => {
    if (value.toString() != req.body.password.toString())
        return Promise.reject('Не равны пароли');
    return true;
}), passport_1.default, controllers.changeUserDataPut);
//# sourceMappingURL=lobby.js.map