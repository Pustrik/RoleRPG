"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.revive = exports.ability = exports.hit = void 0;
const server_1 = require("../server");
function hit() {
    console.log("Hit");
}
exports.hit = hit;
function ability() {
    console.log("Ability");
}
exports.ability = ability;
function revive() {
    console.log("Revive");
}
exports.revive = revive;
function message(msg) {
    server_1.io.emit('chat message', msg);
}
exports.message = message;
//# sourceMappingURL=action.js.map