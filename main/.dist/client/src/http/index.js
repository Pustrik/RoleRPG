"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = void 0;
const axios_1 = __importDefault(require("axios"));
exports.API_URL = `http://localhost:8080/rpg`;
const $api = axios_1.default.create({
    withCredentials: true,
    baseURL: exports.API_URL,
});
$api.interceptors.request.use((config) => {
    console.log(config);
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});
exports.default = $api;
//# sourceMappingURL=index.js.map