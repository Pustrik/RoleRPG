import {Socket} from "socket.io";
import {IPlayer} from "../client/src/store/store_socket";
import {player_model} from "../models/player_model";
import {getAllPlayers, getAllSockets, getSocketsButCurrent, sendMessage} from "../services/socket_service";

export function startListeners(socket: Socket) {
    console.info('Message received from ' + socket.id);

    socket.on('handshake', async (user: IPlayer, callback: (players: IPlayer[]) => void) => {
        console.info('Handshake received from: ' + user.username);

        const reconnected = await getAllSockets();

        if (reconnected.includes(socket.id)) {
            console.info('This user has reconnected');
            console.info('Sending callback for reconnect');
            callback(await getAllPlayers());
            return;
        }
        await player_model.create({socket_id: socket.id, username: user.username, hp: user.hp, statuses: user.statuses});
        const players  = await getAllPlayers();
        console.info('Sending callback');
        callback(players);
        sendMessage('user_connected', getSocketsButCurrent(players, socket.id), players);
    });

    socket.on('disconnect', async () => {
        console.info('Disconnect received from: ' + socket.id);

        const user = player_model.findOne({socket_id: socket.id});
        if (user) {
            await player_model.deleteOne({socket_id: socket.id});
            sendMessage('user_disconnected', await getAllSockets(), socket.id);
        }
    });

    socket.on('attack', async (winger: string, victim: string) => {

    });
}

