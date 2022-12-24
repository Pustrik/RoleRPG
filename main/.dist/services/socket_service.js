"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketsButCurrent = exports.getAllPlayers = exports.getAllSocketID = exports.sendMessage = void 0;
const player_model_1 = require("../models/player_model");
const player_dtos_1 = require("../dtos/player_dtos");
const socket_server_1 = require("../socket/socket_server");
function sendMessage(name, users, payload) {
    console.info('Emitting event: ' + name + ' to', users);
    users.forEach((id) => (payload ? socket_server_1.io.to(id).emit(name, payload) : socket_server_1.io.to(id).emit(name)));
}
exports.sendMessage = sendMessage;
;
async function getAllSocketID() {
    return Object.values(Object.values(await player_model_1.player_model.find()).map((player) => {
        return (0, player_dtos_1.playersDto)(player);
    })).map((val) => { return val.socket_id; });
}
exports.getAllSocketID = getAllSocketID;
async function getAllPlayers() {
    return Object.values(await player_model_1.player_model.find()).map((player) => {
        return (0, player_dtos_1.playersDto)(player);
    });
}
exports.getAllPlayers = getAllPlayers;
function getSocketsButCurrent(players, socket) {
    return players.map((val) => {
        if (val.socket_id !== socket)
            return val.socket_id;
    });
}
exports.getSocketsButCurrent = getSocketsButCurrent;
//# sourceMappingURL=socket_service.js.map