"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketContextProvider = exports.SocketContextConsumer = exports.SocketReducer = exports.defaultSocketContextState = void 0;
const react_1 = require("react");
exports.defaultSocketContextState = {
    socket: undefined,
    uid: '',
    player: {},
    users: [],
    players: []
};
const SocketReducer = (state, action) => {
    console.log('Message received - Action: ' + action.type + ' - Payload: ', action.payload);
    switch (action.type) {
        case 'update_socket':
            return Object.assign(Object.assign({}, state), { socket: action.payload });
        case 'update_uid':
            return Object.assign(Object.assign({}, state), { uid: action.payload });
        case 'update_players':
            return Object.assign(Object.assign({}, state), { players: action.payload });
        case 'update_users':
            return Object.assign(Object.assign({}, state), { users: action.payload });
        case 'remove_user':
            return Object.assign(Object.assign({}, state), { users: state.users.filter((uid) => uid !== action.payload) });
        case 'remove_player':
            return Object.assign(Object.assign({}, state), { players: state.players.filter((uid) => uid.socket_id !== action.payload) });
        default:
            return state;
    }
};
exports.SocketReducer = SocketReducer;
const SocketContext = (0, react_1.createContext)({
    SocketState: exports.defaultSocketContextState,
    SocketDispatch: () => { }
});
exports.SocketContextConsumer = SocketContext.Consumer;
exports.SocketContextProvider = SocketContext.Provider;
exports.default = SocketContext;
//# sourceMappingURL=Store_socket.js.map