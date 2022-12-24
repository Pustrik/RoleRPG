"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketReducer = exports.defaultSocketContextState = void 0;
const react_1 = require("react");
exports.defaultSocketContextState = {
    socket: undefined,
    player: {},
    players: []
};
const SocketReducer = (state, action) => {
    console.log('Message received - Action: ' + action.type + ' - Payload: ', action.payload);
    switch (action.type) {
        case 'update_socket':
            return Object.assign(Object.assign({}, state), { socket: action.payload });
        case 'update_players':
            return Object.assign(Object.assign({}, state), { players: action.payload });
        case 'remove_player':
            return Object.assign(Object.assign({}, state), { players: state.players.filter((uid) => uid.socket_id !== action.payload) });
        default:
            return state;
    }
};
exports.SocketReducer = SocketReducer;
const Store_socket = (0, react_1.createContext)({
    SocketState: exports.defaultSocketContextState,
    SocketDispatch: () => { }
});
exports.default = Store_socket;
//# sourceMappingURL=store_socket.js.map