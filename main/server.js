"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = void 0;
const app_1 = require("./app");
const http = require('http');
const server = http.createServer(app_1.app);
exports.server = server;
const { Server } = require("socket.io");
const io = new Server(server);
exports.io = io;
//# sourceMappingURL=server.js.map