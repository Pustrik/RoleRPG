import * as controllers from "../controllers/lobby-controller";
import express from "express";
import passport from "../middleware/passport";
import {body} from "express-validator";
const lobbyRouter = express.Router();
lobbyRouter.put('/changedata',
    body('username').isLength({min: 1, max: 15}),
    body('password_d' ).custom((value, {req}) => {
        if(value.toString() != req.body.password.toString())
            return Promise.reject('Не равны пароли');
        return true;
    }),
    passport, controllers.changeUserDataPut);
export default lobbyRouter;