import {player_model} from "../models/player_model";
import {playersDto} from "../dtos/player_dtos";
import {IPlayer} from "../client/src/store/store_socket";
import {io} from "../socket/socket_server";

export function sendMessage(name: string, users: string[], payload?: Object) {
    console.info('Emitting event: ' + name + ' to', users);
    users.forEach((id) => (payload ? io.to(id).emit(name, payload) : io.to(id).emit(name)));
};

export async function getAllSockets(): Promise<string[]> {
    return Object.values(Object.values(await player_model.find()).map((player) => {
        return playersDto(player);
    })).map((val) => {return val.socket_id});
}

export async function getAllPlayers(): Promise<IPlayer[]> {
    return Object.values(await player_model.find()).map((player) => {
        return playersDto(player);
    });
}

export function getSocketsButCurrent(players: IPlayer[], socket: string): string[] {
    return players.map((val) => {
        if(val.socket_id !== socket)
            return val.socket_id;
    });
}