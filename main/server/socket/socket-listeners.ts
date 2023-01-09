import {Socket} from "socket.io";
import IPlayer from "../../interfaces/i-player";
import IMessage from "../../interfaces/i-message";
import * as callbacks from "../services/listeners-service";

function startListeners(socket: Socket) {
    console.info('Message received from ' + socket.id);

    socket.on('handshake', async (user: IPlayer, callback: (player: IPlayer, players: IPlayer[]) => void) => {
        await callbacks.handshake(socket, user, callback);
    });

    socket.on('disconnect', async () => {
        await callbacks.disconnect(socket);
    });

    socket.on('attack', async (winger: IPlayer, victim: IPlayer) => {
        await callbacks.attack(socket, winger, victim);
    });

    socket.on('revive', async (player: IPlayer) => {
        await callbacks.revive(socket, player);
    });

    socket.on('spell', async (player: IPlayer, victim?: IPlayer) => {
        await callbacks.spell(socket, player, victim);
    });

    socket.on('message', async (message: IMessage) => {
        await callbacks.message(socket, message);
    });
}

export default startListeners;

