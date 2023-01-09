import player_model from "../databases/mongo_db/models/player-model";
import playersDto from "../dtos/player-dto";
import {io} from "../socket/socket-server";
import IPlayer from "../../interfaces/i-player";

export function sendMessage(name: string, users: string[], payload?: Object) {
    console.info('Emitting event: ' + name + ' to', users);
    if(users.length == 0) return;
    users.forEach((id) => (payload ? io.to(id).emit(name, payload) : io.to(id).emit(name)));
}

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

export async function applyResult(result: number, player: IPlayer) {
    player.hp = result;
    await player_model.updateOne({socket_id: player.socket_id}, {$set: {hp: result}});
    sendMessage('update_all', await getAllSockets(), await getAllPlayers());
    sendMessage('update_one', [player.socket_id], player);
}
export async function applySpell(result: number[], player: IPlayer) {
    player.statuses = result;
    await player_model.updateOne({socket_id: player.socket_id}, {$set: {statuses: result}});
    sendMessage('update_all', await getAllSockets(), await getAllPlayers());
    console.log('Upp one ' + player.socket_id + ' ' + Object.values(player));
    sendMessage('update_one', [player.socket_id], player);
}
export async function buffTimeout(player: IPlayer, status: number) {
    setTimeout(async () => {
        const old_statuses = (await player_model.findOne({socket_id: player.socket_id})).statuses;
        old_statuses[status] = 0;
        player.statuses = old_statuses;
        await player_model.updateOne({socket_id: player.socket_id}, {$set: {statuses: old_statuses}});
        sendMessage('update_all', await getAllSockets(), await getAllPlayers());
        console.log('Undo buff' + player.socket_id + ' ' + Object.values(player));
        sendMessage('update_one', [player.socket_id], player)
    }, 10*1000);
}
