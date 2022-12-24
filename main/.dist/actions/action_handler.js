"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectHandler = void 0;
const action_1 = require("./action");
function connectHandler(socket) {
    console.log('a i_user connected');
    socket.on('disconnect', () => {
        console.log('i_user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
        (0, action_1.message)(msg);
    });
    socket.on('hit', () => {
        (0, action_1.hit)();
    });
    socket.on('ability', () => {
        (0, action_1.ability)();
    });
    socket.on('revive', () => {
        (0, action_1.revive)();
    });
}
exports.connectHandler = connectHandler;
//# sourceMappingURL=action_handler.js.map