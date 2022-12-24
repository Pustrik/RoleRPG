import {http_server, ServerHttpStart} from "./http/http_server";
import {ServerSocketStart} from "./socket/socket_server";
import dotenv from 'dotenv';
dotenv.config();

const start = () => {
    new ServerHttpStart(http_server, process.env.PORT);
    new ServerSocketStart(http_server);
}

start();