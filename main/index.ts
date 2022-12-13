import {io, server} from "./server";
import {connectHandler} from "./actions/action_handler";
const port = 8080;


io.on('connection', connectHandler);
server.listen(port, () => {
    console.log('http://localhost:' + port + '\n',
        'http://localhost:' + port + '/rpg/login\n',
        'http://localhost:' + port + '/rpg/registration\n',
        'http://localhost:' + port + '/rpg/lobby\n',
        'http://localhost:' + port + '/rpg/classes\n'
    );
})
