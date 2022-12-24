import {createContext} from 'react';
import { Socket } from 'socket.io-client';

export interface IPlayer {
    socket_id: string,
    username: string,
    hp: number,
    statuses: Array<Number>
}
export interface ISocketContextState {
    socket: Socket | undefined;
    player: IPlayer,
    players: IPlayer[];
}

export const defaultSocketContextState: ISocketContextState = {
    socket: undefined,
    player: {} as IPlayer,
    players: []
};

export type TSocketContextActions = 'update_socket' | 'update_players' | 'remove_player';
export type TSocketContextPayload = string | string[] | Socket | IPlayer[] | IPlayer;

export interface ISocketContextActions {
    type: TSocketContextActions;
    payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
    console.log('Message received - Action: ' + action.type + ' - Payload: ', action.payload);

    switch (action.type) {
        case 'update_socket':
            return { ...state, socket: action.payload as Socket };
        case 'update_players':
            return { ...state, players: action.payload as IPlayer[] };
        case 'remove_player':
            return { ...state, players: state.players.filter((uid) => uid.socket_id !== (action.payload as string)) };
        default:
            return state;
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const Store_socket = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {}
});
export default Store_socket;