import {classes_router} from "./routes/classes";
import {auth_router} from "./routes/auth";
import {lobby_router} from "./routes/lobby";
const express = require('express');
const body_parser = require('body-parser');

const app = express();
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use('/rpg', auth_router);
app.use('/rpg', classes_router);
app.use('/rpg', lobby_router);

export {app};

