import {lobby} from "../router_callbacks/lobby_callbacks";


const express = require('express');

const lobby_router = express.Router();
lobby_router.get('/lobby', lobby);

export {lobby_router};