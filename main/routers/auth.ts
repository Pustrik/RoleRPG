import * as controllers from "../controllers/auth";
import express from 'express';
import {body, check} from 'express-validator';
import passport from "../middleware/passport";
const auth_router = express.Router();
auth_router.post('/login', controllers.loginPost);
auth_router.post('/registration',
    body('username').isLength({min: 1, max: 15}),
    body('password').isLength({min: 1, max: 15}),
    body('password_d' ).custom((value, {req}) => {
        if(value.toString() != req.body.password.toString())
            return Promise.reject('Не равны пароли');
        return true;
    }),
    body('email').isEmail(),
    controllers.registrationPost);
auth_router.post('/logout', controllers.logoutPost);
auth_router.get('/refresh', controllers.refreshGet);
auth_router.get('/users', passport, controllers.allUsersGet);
export default auth_router;