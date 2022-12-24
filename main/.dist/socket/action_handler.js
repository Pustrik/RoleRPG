"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startListeners = void 0;
const player_model_1 = require("../models/player_model");
const socket_service_1 = require("../services/socket_service");
function startListeners(socket) {
    console.info('Message received from ' + socket.id);
    socket.on('handshake', async (user, callback) => {
        console.info('Handshake received from: ' + user.username);
        const reconnected = await (0, socket_service_1.getAllSocketID)();
        if (reconnected.includes(socket.id)) {
            console.info('This user has reconnected');
            console.info('Sending callback for reconnect');
            callback(await (0, socket_service_1.getAllPlayers)());
            return;
        }
        const user_data = await player_model_1.player_model.create({ socket_id: socket.id, username: user.username, hp: user.hp, statuses: user.statuses });
        const players = await (0, socket_service_1.getAllPlayers)();
        console.info('Sending callback');
        callback(players);
        // sendMessage('user_connected',
        //     Object.values(Object.values(players).map((val) => {
        //         if(val.socket_id !== socket.id)
        //             return val.socket_id;
        //     })), players
        // );
        (0, socket_service_1.sendMessage)('user_connected', (0, socket_service_1.getSocketsButCurrent)(players, socket.id), players);
    });
    socket.on('disconnect', async () => {
        console.info('Disconnect received from: ' + socket.id);
        const user = player_model_1.player_model.findOne({ socket_id: socket.id });
        if (user) {
            const user_data = await player_model_1.player_model.deleteOne({ socket_id: socket.id });
            (0, socket_service_1.sendMessage)('user_disconnected', await (0, socket_service_1.getAllSocketID)(), socket.id);
        }
    });
}
exports.startListeners = startListeners;
//# sourceMappingURL=action_handler.js.map