import {io} from "../socket/socket-server";
import player_model from "../databases/mongo_db/models/player-model";

async function gracefulShutdown(server) {
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

export default gracefulShutdown;