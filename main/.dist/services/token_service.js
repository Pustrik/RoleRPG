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
exports.validateRefreshToken = exports.validateAccessToken = exports.findToken = exports.removeToken = exports.saveToken = exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const token_model_1 = require("../models/token_model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateToken(payload) {
    const access_token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: '3h' });
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '30d' });
    return { access_token, refresh_token };
}
exports.generateToken = generateToken;
async function saveToken(user_id, refresh_token) {
    const token_data = await token_model_1.token_model.findOne({ user: user_id });
    if (token_data) {
        token_data.refresh_token = refresh_token;
        return await token_data.save();
    }
    const token = await token_model_1.token_model.create({ user: user_id, refresh_token: refresh_token });
    return token;
}
exports.saveToken = saveToken;
async function removeToken(refresh_token) {
    const token_data = await token_model_1.token_model.deleteOne({ refresh_token: refresh_token });
    return token_data;
}
exports.removeToken = removeToken;
async function findToken(refresh_token) {
    const token_data = await token_model_1.token_model.findOne({ refresh_token: refresh_token });
    return token_data;
}
exports.findToken = findToken;
function validateAccessToken(token) {
    try {
        const user_data = jwt.verify(token, process.env.JWT_ACCESS);
        return user_data;
    }
    catch (e) {
        return null;
    }
}
exports.validateAccessToken = validateAccessToken;
function validateRefreshToken(token) {
    try {
        const user_data = jwt.verify(token, process.env.JWT_REFRESH);
        return user_data;
    }
    catch (e) {
        return null;
    }
}
exports.validateRefreshToken = validateRefreshToken;
//# sourceMappingURL=token_service.js.map