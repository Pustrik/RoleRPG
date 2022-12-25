import React, {useContext, useEffect, useReducer, useState} from 'react';
import {ISocketContextState, SocketReducer} from "../store/store_socket";
import {Context} from "../index";
import {useNavigate} from "react-router";
import {useSocket} from "../hooks/useSocket";
import {IPlayer} from "../../../interfaces/I_player";
import './lobby_styles.css';
import {IMessage} from "../../../interfaces/i_message";
export interface IApplicationProps {}
const LobbyPage: React.FunctionComponent<IApplicationProps> = (props) => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [message, setMessage] = useState<string>('');
    useEffect(() => {
        if(!store.is_auth) {
                navigate('/');
                return;
        }

    }, [])
    const socket = useSocket('ws://localhost:8080', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false,
    });
    const defaultSocketContextState: ISocketContextState = {
        socket: undefined,
        player: {
            socket_id: '',
            username: store.user.username,
            hp: 0,
            statuses: [0, 0],
            class_id: 0
        },
        players: [],
        messages: [{username:'', message:''}]
    };
    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.connect();
        SocketDispatch({type: 'update_socket', payload: socket});
        StartListeners();
        SendHandshake();
        // eslint-disable-next-line
    }, []);

    const StartListeners = () => {
        /** Messages */
        socket.on('user_connected', (players: IPlayer[]) => {
            console.info('User connected message received');
            SocketDispatch({ type: 'update_players', payload: players });
        });

        /** Messages */
        socket.on('user_disconnected', (player: string) => {
            console.info('User disconnected message received');
            SocketDispatch({ type: 'remove_player', payload: player});
        });

        socket.on('cant_attack', () => {
            alert('Нельзя атаковать');
        });

        socket.on('cant_spell', () => {
            alert('Нельзя применить спел');
        });

        socket.on('cant_revive', () => {
            alert('Нельзя воскреснуть');
        });

        socket.on('update_chat', (messages: IMessage[]) => {
            console.info('Messages upd');
            SocketDispatch({ type: 'update_messages', payload: messages});
        });

        socket.on('update_all', (players: IPlayer[]) => {
            console.info('Attack happen');
            SocketDispatch({ type: 'update_players', payload: players});
        });
        socket.on('update_one', (player: IPlayer) => {
            console.info('Attack happen');
            SocketDispatch({ type: 'update_player', payload: player});
        });
        /** Connection / reconnection listeners */
        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnected on attempt: ' + attempt);
            SendHandshake();
        });

        socket.io.on('reconnect_attempt', (attempt) => {
            console.info('Reconnection Attempt: ' + attempt);
        });

        socket.io.on('reconnect_error', (error) => {
            console.info('Reconnection error: ' + error);
        });

        socket.io.on('reconnect_failed', () => {
            console.info('Reconnection failure.');
            alert('We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.');
        });
    };

    const SendHandshake = async () => {
        console.info('Sending handshake to server ...');
        socket.emit('handshake', SocketState.player, async (player: IPlayer, players: IPlayer[]) => {
            console.info('User handshake callback message received');
            SocketDispatch({ type: 'update_player', payload: player });
            SocketDispatch({ type: 'update_players', payload: players });
        });
        // setLoading(false);
    };

    const Nav = () => {
        navigate('/');
    }
    const Al = (a: string) => {
        alert(' ATTACK ' + a);
    }
    const Class = (id: number) => {
        if(id === 0)
            return 'Warrior';
        if(id === 1)
            return 'Mage';
        return 'Thief';
    }
    const Attack = (victim_name: string) => {
        const victim = SocketState.players.find((value) => {
            if(value.username === victim_name)
                return value;
        });
        console.info(SocketState.player.username + ' атакует ' + victim_name);
        socket.emit('attack', SocketState.player, victim);
    }
    const Revive = () => {
        console.info(SocketState.player.username + ' пытается воскреснуть');
        socket.emit('revive', SocketState.player);
    }
    const UseSpellMage = (victim_name: string) => {
        const victim = SocketState.players.find((value) => {
            if(value.username === victim_name)
                return value;
        });
        console.info(SocketState.player.username + ' пытается использовать спел');
        socket.emit('spell', SocketState.player, victim);
    }
    const UseSpell = () => {
        console.info(SocketState.player.username + ' пытается использовать спел');
        socket.emit('spell', SocketState.player);
    }
    const MageStatus = (status: number[]) => {
        if(status[1] == 1)
            return <li>Нельзя кастовать</li>
        return <li></li>
    }
    const ElseStatus = (status: number[]) => {
        if(status[0] == 1)
            if(SocketState.player.class_id == 0)
                return <li>Защищен от физ. урона</li>
            else
                return <li>Ушел в тень</li>
        return <li></li>
    }
    const SendMessage = (message: string, username: string) => {
        socket.emit('message', {username: username, message: message});
    }

    const GetClass = (id: number) => {
        if(id == 0)
            return 'Воин'
        if(id == 1)
            return 'Маг'
        return 'Вор'

    };
    if(SocketState.player.class_id == 1)
        return (
            <div>
                <div className='main'>
                <h2>Информация об игроке</h2>
                <p>
                    <br />
                    Класс: <strong>{Class(SocketState.player.class_id)}</strong>
                    <br />
                    Здоровье: <strong>{SocketState.player.hp}</strong><button onClick={() => Revive()}>Воскреснуть</button>
                    <br />
                    Дебафы: <strong>{MageStatus(SocketState.player.statuses)}</strong>
                    <br />
                    <br />
                    <strong>Игроки онлайн: </strong>
                    {SocketState.players.filter((player) => SocketState.player.username !== player.username).map((player) => <li>{'Юзернейм: ' + player.username + ' Здоровье: ' + player.hp + ' Класс: ' + GetClass(player.class_id)}<button onClick={() => Attack(player.username)}>Удар</button><button onClick={() => UseSpellMage(player.username)}>Спел</button></li>)}
                    <button onClick={Nav}>Назад</button>
                    <br />
                </p>
                </div>
                <div className='chat'>
                    {SocketState.messages.map((message) => <li>{message.username + ': ' + message.message}</li>)}
                    <div className='message'>
                        <input
                            onChange={e => setMessage(e.target.value)}
                            value={message}
                            type={"text"}
                            placeholder={"message"}
                        />
                        <button onClick={() => SendMessage(message, SocketState.player.username)}>Отправить</button>
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div>
                <div className='main'>
                <h2>Информация об игроке</h2>
                <p>
                    <br />
                    Класс: <strong>{Class(SocketState.player.class_id)}</strong>
                    <br />
                    Здоровье: <strong>{SocketState.player.hp}</strong><button onClick={() => Revive()}>Воскреснуть</button><button onClick={() => {UseSpell()}}>Способность</button>
                    <br />
                    Бафы: <strong>{ElseStatus(SocketState.player.statuses)}</strong>
                    Дебафы: <strong>{MageStatus(SocketState.player.statuses)}</strong>
                    <br />
                    <br />
                    <strong>Игроки онлайн: </strong>
                    {SocketState.players.filter((player) => SocketState.player.username !== player.username).map((player) => <li>{'Юзернейм: ' + player.username + ' Здоровье: ' + player.hp + ' Класс: ' + GetClass(player.class_id)}<button onClick={() => Attack(player.username)}>Удар</button></li>)}
                    <button onClick={Nav}>Назад</button>
                    <br />

                </p>
                </div>
                <div className='chat'>
                    {SocketState.messages.map((message) => <li>{message.username + ': ' + message.message}</li>)}
                    <div className='message'>
                        <input
                            onChange={e => setMessage(e.target.value)}
                            value={message}
                            type={"text"}
                            placeholder={"message"}
                        />
                        <button onClick={() => SendMessage(message, SocketState.player.username)}>Отправить</button>
                    </div>
                </div>
            </div>

        );
};

export default LobbyPage;