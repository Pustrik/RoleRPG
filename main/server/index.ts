import {httpServer, ServerHttpStart} from "./http/http-server";
import ServerSocketStart from "./socket/socket-server";
import dotenv from 'dotenv';
import gracefulShutdown from "./utills/shutdown-utill";
dotenv.config();

const start = async () => {
    new ServerHttpStart(httpServer, process.env.PORT);
    new ServerSocketStart(httpServer);
    await gracefulShutdown(httpServer);
}

start();