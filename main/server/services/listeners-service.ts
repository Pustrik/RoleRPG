import IPlayer from '../../interfaces/I-player';
import IMessage from '../../interfaces/i-message';
import {redisDB} from '../databases/redis_db/redis-db';
import {getUserByUsername} from './pdb-service';
import {getBasics} from '../entityes/character-actions';
import player_model from '../databases/mongo_db/models/player-model';
import {Socket} from 'socket.io';
import {CharClass, createCharacter} from '../entityes/create-character';
import {Warrior} from '../entityes/warrior';
import {Thief} from '../entityes/thief';
import {
    applyResult,
    applySpell, buffTimeout,
    getAllPlayers,
    getAllSockets,
    getSocketsButCurrent,
    sendMessage
} from './socket-service';

export async function handshake(socket: Socket, user: IPlayer, callback: (player: IPlayer, players: IPlayer[]) => void) {
    console.info('Handshake received from: ' + user.username);
    try {
        const reconnected = await getAllSockets();
        if (reconnected.includes(socket.id)) {
            console.info('This user has reconnected');
            console.info('Sending callback for reconnect');
            callback(user, await getAllPlayers());
            return;
        }
        const mes_cache: IMessage[] = JSON.parse(await redisDB.get('messages'));
        user.class_id = (await getUserByUsername(user.username)).class_id;
        user.socket_id = socket.id;
        user.hp = getBasics(user.class_id);
        await player_model.create({
            socket_id: socket.id,
            username: user.username,
            hp: user.hp,
            statuses: user.statuses,
            class_id: user.class_id
        });
        const players = await getAllPlayers();
        console.info('Sending callback');
        callback(user, players);
        sendMessage('user_connected', getSocketsButCurrent(players, socket.id), players);
        sendMessage('update_chat', await getAllSockets(), mes_cache.slice(-10));
    } catch (err) {
        console.warn('Handshake error: ' + err);
        sendMessage('error', err);
    }
}

export async function disconnect(socket: Socket) {
    try {
        console.info('Disconnect received from: ' + socket.id);

        const user = player_model.findOne({socket_id: socket.id});
        if (user) {
            await player_model.deleteOne({socket_id: socket.id});
            sendMessage('user_disconnected', await getAllSockets(), socket.id);
        }
    } catch (err) {
        console.warn('Disconnect error: ' + err);
        sendMessage('error', err);
    }
}

export async function attack(socket: Socket, winger: IPlayer, victim: IPlayer) {
    try {
        const result = createCharacter(victim.class_id).gettingDamage(createCharacter(winger.class_id).dealingDamage(), victim.hp, victim.statuses);
        console.info('Attack result ' + winger.username + ' on ' + victim.username + ' = ' + result);
        if (typeof result == "boolean" || winger.hp <= 0) {
            sendMessage('cant_attack', [socket.id]);
            return;
        }
        await applyResult(result, victim);
    } catch (err) {
        console.warn('Action error: ' + err);
        sendMessage('error', err);
    }
}

export async function revive(socket: Socket, player: IPlayer) {
    try {
        const result = createCharacter(player.class_id).revive(player.hp);
        console.info('Revive result ' + player.username + ' hp: ' + player.hp + ' = ' + result);
        if (typeof result == "boolean") {
            sendMessage('cant_revive', [socket.id]);
            return;
        }
        await applyResult(result, player);
    } catch (err) {
        console.warn('Action error: ' + err);
        sendMessage('error', err);
    }
}

export async function spell(socket: Socket, player: IPlayer, victim?: IPlayer) {
    try {
        if (player.class_id == CharClass.MAGE) {
            const result = createCharacter(player.class_id).useAbility(player.statuses, victim.statuses);
            if (typeof result == "boolean" || player.hp <= 0 || victim.hp <= 0) {
                sendMessage('cant_spell', [socket.id]);
                return;
            }
            console.info('Using spell: ' + player.username + ' on ' + victim.username);
            await applySpell(result, victim);
            await buffTimeout(victim, 1);
        } else {
            const result = (createCharacter(player.class_id) as Warrior | Thief).useAbility(player.statuses);
            if (typeof result == "boolean" || player.hp <= 0) {
                sendMessage('cant_spell', [socket.id]);
                return;
            }
            console.info('Using spell: ' + player.username);
            await applySpell(result, player);
            await buffTimeout(player, 0);
        }
    } catch (err) {
        console.warn('Action error: ' + err);
        sendMessage('error', err);
    }
}

export async function message(socket: Socket, message: IMessage) {
    try {
        const mesCache: IMessage[] = JSON.parse(await redisDB.get('messages'));
        if (mesCache) {
            mesCache.push(message);
            await redisDB.set('messages', JSON.stringify(mesCache));
        }
        console.info('Received message: ' + message.username + ': ' + message.message);
        sendMessage('update_chat', await getAllSockets(), mesCache.slice(-10));
    } catch (err) {
        console.warn('Action error: ' + err);
        sendMessage('error', err);
    }
}

