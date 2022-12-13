"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const classes_1 = require("./routes/classes");
const auth_1 = require("./routes/auth");
const lobby_1 = require("./routes/lobby");
const express = require('express');
const body_parser = require('body-parser');
const app = express();
exports.app = app;
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use('/rpg', auth_1.auth_router);
app.use('/rpg', classes_1.classes_router);
app.use('/rpg', lobby_1.lobby_router);
//# sourceMappingURL=app.js.map