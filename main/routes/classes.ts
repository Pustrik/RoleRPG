import {classes} from "../router_callbacks/classes_callbacks";

const express = require('express');

const classes_router = express.Router();
classes_router.get('/classes', classes);

export {classes_router};