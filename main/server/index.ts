import {http_server, ServerHttpStart} from "./http/http_server";
import {ServerSocketStart} from "./socket/socket_server";
import dotenv from 'dotenv';
import {gracefulShutdown} from "./utills/shutdown_utill";
dotenv.config();

const start = async () => {
    new ServerHttpStart(http_server, process.env.PORT);
    new ServerSocketStart(http_server);
    await gracefulShutdown(http_server);
}

start();