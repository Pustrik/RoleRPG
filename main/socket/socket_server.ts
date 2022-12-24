import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import {startListeners} from "./action_handler";
export let io: Server;
export class ServerSocketStart {
    constructor(server: HttpServer) {
        io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });
        console.info('Socket server run')
        io.on('connect', startListeners);
    }
}