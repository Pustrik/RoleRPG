import {ability, hit, message, revive} from "./action";

export function connectHandler(socket) {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
        message(msg);
    });
    socket.on('hit', () => {
        hit();
    });
    socket.on('ability', () => {
        ability();
    });
    socket.on('revive', () => {
        revive();
    });
}