import {loginGet, loginPost, registrationGet, registrationPost,} from "../router_callbacks/auth_callbacks";

const express = require('express');
const auth_router = express.Router();
auth_router.post('/login', loginPost);
auth_router.get('/login', loginGet);
auth_router.post('/registration', registrationPost);
auth_router.get('/registration', registrationGet);


export {auth_router};