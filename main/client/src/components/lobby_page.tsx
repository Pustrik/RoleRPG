import React, {useContext, useEffect, useReducer, useState} from 'react';
import {IPlayer, ISocketContextState, SocketReducer} from "../store/store_socket";
import {Context} from "../index";
import {useNavigate} from "react-router";
import {useSocket} from "../hooks/useSocket";

export interface IApplicationProps {}
const LobbyPage: React.FunctionComponent<IApplicationProps> = (props) => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
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
            statuses: [0, 0, 0],
        },
        players: []
    };
    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);

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
        socket.emit('handshake', SocketState.player, async (players: IPlayer[]) => {
            console.info('User handshake callback message received');
            // SocketDispatch({ type: 'update_users', payload: users });
            SocketDispatch({ type: 'update_players', payload: players });
            // SocketDispatch({ type: 'update_uid', payload: uid });
        });
        setLoading(false);
    };

    const Nav = () => {
        navigate('/');
    }
    const Al = (a: string) => {
        alert(' ATTACK ' + a);
    }
    return (
        <div>
            <h2>Socket IO Information:</h2>
            <p>
                Your user name: <strong>{SocketState.player.username}</strong>
                <br />
                Your user socket id: <strong>{SocketState.player.socket_id}</strong>
                <br />
                Your user hp: <strong>{SocketState.player.hp}</strong>
                <br />
                Your user statuses: <strong>{SocketState.player.statuses.map((status) => <li key={status.toString()}>{status.toString()}</li>)}</strong>
                <br />
                Socket ID: <strong>{SocketState.socket?.id}</strong>
                <br />
                <br />
                {SocketState.players.map((player) => <li >{player.hp + ' ' + player.username + ' ' + player.socket_id}<button onClick={() => Al(player.username)}>Удар</button></li>)}
                <button onClick={Nav}>Назад</button>
                <br />
                {/*{SocketState.usernames.map((user) => <li key={user}>{user}</li>)}*/}
            </p>
        </div>
    );

};

export default LobbyPage;