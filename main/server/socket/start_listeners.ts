import {Socket} from "socket.io";
import {player_model} from "../models/player_model";
import {
    applyResult,
    applySpell,
    getAllPlayers,
    getAllSockets,
    getSocketsButCurrent,
    sendMessage, buffTimeout,
} from "../services/socket_service";
import {IPlayer} from "../../interfaces/I_player";
import {getUserByUsername} from "../services/pdb_service";
import {getBasics} from "../entityes/character_actions";
import {char_class, createCharacter} from "../entityes/create_character";
import {Warrior} from "../entityes/warrior";
import {Thief} from "../entityes/thief";
import {redisDB} from "../redis_db/redis";
import {IMessage} from "../../interfaces/i_message";

export function startListeners(socket: Socket) {
    console.info('Message received from ' + socket.id);
    socket.on('handshake', async (user: IPlayer, callback: (player: IPlayer, players: IPlayer[]) => void) => {
        console.info('Handshake received from: ' + user.username);
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
        await player_model.create({socket_id: socket.id, username: user.username, hp: user.hp, statuses: user.statuses, class_id: user.class_id});
        const players  = await getAllPlayers();
        console.info('Sending callback');
        callback(user, players);
        sendMessage('user_connected', getSocketsButCurrent(players, socket.id), players);
        sendMessage('update_chat', await getAllSockets(), mes_cache.slice(-10));
    });

    socket.on('disconnect', async () => {
        console.info('Disconnect received from: ' + socket.id);

        const user = player_model.findOne({socket_id: socket.id});
        if (user) {
            await player_model.deleteOne({socket_id: socket.id});
            sendMessage('user_disconnected', await getAllSockets(), socket.id);
        }
    });

    socket.on('attack', async (winger: IPlayer, victim: IPlayer) => {
        const result = createCharacter(victim.class_id).gettingDamage(createCharacter(winger.class_id).dealingDamage(), victim.hp, victim.statuses);
        console.log('Результат атаки ' + winger.username + ' на ' + victim.username + ' = ' + result);
        console.log('Сокет ' + socket.id);
        if(typeof result == "boolean" || winger.hp <= 0) {
            sendMessage('cant_attack', [socket.id]);
            return;
        }
        await applyResult(result,victim);
    });

    socket.on('revive', async (player: IPlayer) => {
        const result = createCharacter(player.class_id).revive(player.hp);
        console.log('Результат возрождения ' + player.username + ' c ' + player.hp + ' = ' + result);
        console.log('Сокет ' + socket.id);
        if(typeof result == "boolean") {
            sendMessage('cant_revive', [socket.id]);
            return;
        }
        await applyResult(result, player);
    });
    socket.on('spell', async (player: IPlayer, victim?: IPlayer) => {
        const player_statuses = Object.values(player.statuses);
        const victim_statuses = Object.values(victim ? victim.statuses : 0);
        if(player.class_id == char_class.MAGE) {
            const result = createCharacter(player.class_id).useAbility(player.statuses, victim.statuses);
            if(typeof result == "boolean" || player.hp <= 0 || victim.hp <= 0) {
                sendMessage('cant_spell', [socket.id]);
                return;
            }
            await applySpell(result, victim);
            await buffTimeout(victim, 1);
        } else {
            console.log('Old statuses ' + player_statuses);

            const result = (createCharacter(player.class_id) as Warrior | Thief).useAbility(player.statuses);
            if(typeof result == "boolean" || player.hp <= 0) {
                sendMessage('cant_spell', [socket.id]);
                return;
            }
            await applySpell(result, player);
            await buffTimeout(player, 0);
        }
    });

    socket.on('message', async (message: IMessage) => {
        const mes_cache: IMessage[] = JSON.parse(await redisDB.get('messages'));
        if(mes_cache) {
            mes_cache.push(message);
            await redisDB.set('messages', JSON.stringify(mes_cache));
        }
        console.log('Message ' + message);
        sendMessage('update_chat', await getAllSockets(), mes_cache.slice(-10));
    });
}

