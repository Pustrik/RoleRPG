"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerHttpStart = exports.http_server = void 0;
const app_1 = require("../app");
const http_1 = __importDefault(require("http"));
exports.http_server = http_1.default.createServer(app_1.app);
class ServerHttpStart {
    constructor(server, port) {
        server.listen(port, () => {
            console.log('Server run:\n' +
                'http://localhost:' + process.env.PORT + '\n' +
                'Frontend:\n' +
                'http://localhost:3000\n');
        });
    }
}
exports.ServerHttpStart = ServerHttpStart;
//# sourceMappingURL=http_server.js.map