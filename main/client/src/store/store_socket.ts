import {createContext} from 'react';
import { Socket } from 'socket.io-client';
import {IPlayer} from "../../../interfaces/I_player";
import {IMessage} from "../../../interfaces/i_message";

export interface ISocketContextState {
    socket: Socket | undefined;
    player: IPlayer,
    players: IPlayer[];
    messages: IMessage[];
}

export const defaultSocketContextState: ISocketContextState = {
    socket: undefined,
    player: {} as IPlayer,
    players: [],
    messages: []
};

export type TSocketContextActions = 'update_socket' | 'update_players' | 'remove_player' | 'update_player' | 'update_messages';
export type TSocketContextPayload = string | string[] | Socket | IPlayer[] | IPlayer | IMessage[];

export interface ISocketContextActions {
    type: TSocketContextActions;
    payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
    console.log('Message received - Action: ' + action.type + ' - Payload: ', action.payload);

    switch (action.type) {
        case 'update_socket':
            return { ...state, socket: action.payload as Socket };
        case 'update_player':
            return { ...state, player: action.payload as IPlayer };
        case 'update_messages':
            return {...state, messages: action.payload as IMessage[] }
        case 'update_players':
            return { ...state, players: action.payload as IPlayer[] };
        case 'remove_player':
            return { ...state, players: state.players.filter((id) => id.socket_id !== (action.payload as string)) };
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