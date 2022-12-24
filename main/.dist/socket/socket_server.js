"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSocketStart = exports.io = void 0;
const socket_io_1 = require("socket.io");
const action_handler_1 = require("./action_handler");
class ServerSocketStart {
    constructor(server) {
        exports.io = new socket_io_1.Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });
        console.info('Socket server run');
        exports.io.on('connect', action_handler_1.startListeners);
    }
}
exports.ServerSocketStart = ServerSocketStart;
//# sourceMappingURL=socket_server.js.map