import * as controllers from "../controllers/auth-controller";
import express from 'express';
import {body} from 'express-validator';
import passport from '../middleware/passport';
const authRouter = express.Router();
authRouter.post('/login', controllers.loginPost);
authRouter.post('/registration',
    body('username').isLength({min: 1, max: 15}),
    body('password').isLength({min: 1, max: 15}),
    body('password_d' ).custom((value, {req}) => {
        if(value.toString() != req.body.password.toString())
            return Promise.reject('Не равны пароли');
        return true;
    }),
    body('email').isEmail(),
    controllers.registrationPost);
authRouter.post('/logout', controllers.logoutPost);
authRouter.get('/refresh', controllers.refreshGet);
authRouter.get('/users', passport, controllers.allUsersGet);
export default authRouter;