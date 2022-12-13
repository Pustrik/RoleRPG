"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_router = void 0;
const auth_callbacks_1 = require("../router_callbacks/auth_callbacks");
const express = require('express');
const auth_router = express.Router();
exports.auth_router = auth_router;
auth_router.post('/login', auth_callbacks_1.loginPost);
auth_router.get('/login', auth_callbacks_1.loginGet);
auth_router.post('/registration', auth_callbacks_1.registrationPost);
auth_router.get('/registration', auth_callbacks_1.registrationGet);
//# sourceMappingURL=auth.js.map