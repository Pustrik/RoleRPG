import {io} from "../socket/socket_server";
import {player_model} from "../models/player_model";

export async function gracefulShutdown(server) {
    process.on('SIGTERM', async () => {
        console.info('SIGTERM сигнал получен');
        server.close(() => {
            console.log('Http сервер остановлен');
        })
        io.close(async () => {
            await player_model.remove();
            console.log('Socket сервер остановлен');
        })
    })
}