import {app} from "../app";
import http from "http";
export const http_server = http.createServer(app);

export class ServerHttpStart {
    constructor(server: http.Server, port: string) {
        server.listen(port, () => {
            console.log('Server run:\n' +
                'http://localhost:' + process.env.PORT + '\n' +
                'Frontend:\n' +
                'http://localhost:3000\n');
        });
    }

}