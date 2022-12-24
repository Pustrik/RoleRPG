"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_server_1 = require("./http/http_server");
const socket_server_1 = require("./socket/socket_server");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const start = () => {
    new http_server_1.ServerHttpStart(http_server_1.http_server, process.env.PORT);
    new socket_server_1.ServerSocketStart(http_server_1.http_server);
};
start();
//# sourceMappingURL=index.js.map