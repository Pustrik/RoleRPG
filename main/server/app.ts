import {classes_router} from "./routers/classes";
import auth_router from "./routers/auth";
import {lobby_router} from "./routers/lobby";
import dotenv from 'dotenv';
import express from "express";
import body_parser from "body-parser";
import * as mongoDB from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from "./middleware/errorhandler";
import {redisDB} from "./redis_db/redis";
const app = express();
dotenv.config();

// Подключаем бд
mongoDB.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to mongoDB'))
    .catch((e) => console.log('Cant connect to mongoDB'));
redisDB.connect()
    .then(() => console.log('Connected to redisDB'))
    .catch((e) => console.log('Cant connect to redisDB'));

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
app.use(errorHandler);

export {app};

