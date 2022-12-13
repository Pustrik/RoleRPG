"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lobby_router = void 0;
const lobby_callbacks_1 = require("../router_callbacks/lobby_callbacks");
const express = require('express');
const lobby_router = express.Router();
exports.lobby_router = lobby_router;
lobby_router.get('/lobby', lobby_callbacks_1.lobby);
//# sourceMappingURL=lobby.js.map