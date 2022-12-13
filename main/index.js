"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const action_handler_1 = require("./actions/action_handler");
const port = 8080;
server_1.io.on('connection', action_handler_1.connectHandler);
server_1.server.listen(port, () => {
    console.log('http://localhost:' + port + '\n', 'http://localhost:' + port + '/rpg/login\n', 'http://localhost:' + port + '/rpg/registration\n', 'http://localhost:' + port + '/rpg/lobby\n', 'http://localhost:' + port + '/rpg/classes\n');
});
//# sourceMappingURL=index.js.map