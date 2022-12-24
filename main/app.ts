import {classes_router} from "./routers/classes";
import auth_router from "./routers/auth";
import {lobby_router} from "./routers/lobby";
import dotenv from 'dotenv';
import express from "express";
import body_parser from "body-parser";
import * as mongoDB from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import middlewareError from "./exteptions/middleware_exceptions";
const app = express();
dotenv.config();

// Подключаем бд

mongoDB.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to DB'))
    .catch((e) => console.log('Cant connect to DB'));
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());

app.use('/rpg', auth_router);
app.use('/rpg', classes_router);
app.use('/rpg', lobby_router);
app.use(middlewareError);

export {app};

