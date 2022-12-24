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
exports.changeUserData = exports.allActiveUsers = exports.refresh = exports.logout = exports.login = exports.registration = void 0;
const user_model_1 = require("../models/user_model");
const bcrypt = __importStar(require("bcrypt"));
const token_service_1 = require("./token_service");
const api_exceptions_1 = __importDefault(require("../exteptions/api_exceptions"));
const pdb_service_1 = require("./pdb_service");
const user_utill_1 = require("../utills/user_utill");
async function registration(username, email, password, class_id) {
    const candidate = await user_model_1.user_model.findOne({ username: username });
    if (candidate)
        throw api_exceptions_1.default.badRequest('Пользователь существует');
    const hash = bcrypt.hashSync(password, 5);
    const user = await user_model_1.user_model.create({ username: username, password: hash });
    const user_pdg = await (0, pdb_service_1.addUser)(user.id, username, email, hash, class_id);
    return await (0, user_utill_1.userTokens)(user);
}
exports.registration = registration;
async function login(username, password) {
    const user = await user_model_1.user_model.findOne({ username });
    if (!user)
        throw api_exceptions_1.default.badRequest('Пользователь не существует');
    const is_equal = bcrypt.compareSync(password, user.password);
    if (!is_equal)
        throw api_exceptions_1.default.badRequest('Не верный пароль');
    return await (0, user_utill_1.userTokens)(user);
}
exports.login = login;
async function logout(refresh_token) {
    return await (0, token_service_1.removeToken)(refresh_token);
}
exports.logout = logout;
async function refresh(refresh_token) {
    if (!refresh_token)
        throw api_exceptions_1.default.unauthorizedError();
    const user_data = (0, token_service_1.validateRefreshToken)(refresh_token);
    const token_from_db = await (0, token_service_1.findToken)(refresh_token);
    if (!user_data || !token_from_db)
        throw api_exceptions_1.default.unauthorizedError();
    const user = await user_model_1.user_model.findById(token_from_db.user);
    return await (0, user_utill_1.userTokens)(user);
}
exports.refresh = refresh;
async function allActiveUsers() {
    const users = await user_model_1.user_model.find();
    return users;
}
exports.allActiveUsers = allActiveUsers;
async function changeUserData(id, username, password, password_d, password_old, class_id) {
    const user = await (0, pdb_service_1.getUserById)(id);
    const is_equal = bcrypt.compareSync(password_old, user.password);
    if (!is_equal)
        throw api_exceptions_1.default.badRequest('Не верный пароль');
    const hash = bcrypt.hashSync(password, 5);
    const user_pdb = await (0, pdb_service_1.updateUser)(id, username, hash, class_id);
    const user_mdb = await user_model_1.user_model.findById(id);
    user_mdb.username = username;
    user_mdb.password = hash;
    await user_mdb.save();
    return await (0, user_utill_1.userTokens)(user_mdb);
}
exports.changeUserData = changeUserData;
//# sourceMappingURL=user_service.js.map