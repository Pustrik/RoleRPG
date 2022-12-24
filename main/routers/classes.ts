import * as controllers from "../controllers/classes";
import passport from "passport";

const express = require('express');

const classes_router = express.Router();
classes_router.get('/classes', passport.authenticate('jwt', {session: false}), controllers.classes);

export {classes_router};