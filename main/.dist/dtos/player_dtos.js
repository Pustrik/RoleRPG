"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playersDto = void 0;
function playersDto(player) {
    return {
        socket_id: player.socket_id,
        username: player.username,
        hp: player.hp,
        statuses: player.statuses
    };
}
exports.playersDto = playersDto;
//# sourceMappingURL=player_dtos.js.map