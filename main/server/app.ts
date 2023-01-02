import authRouter from './routers/auth-router';
import lobbyRouter from './routers/lobby-router';
import dotenv from 'dotenv';
import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorhandler';
import {connectRedis} from "./databases/redis_db/redis-db";
import {connectPostgre} from "./databases/postgre_db/postgre-db";
import connectMongo from "./databases/mongo_db/mongo-db";
const app = express();
dotenv.config();

connectMongo();
connectRedis();
connectPostgre();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}));
app.use(cookieParser());

app.use('/rpg', authRouter);
app.use('/rpg', lobbyRouter);
app.use(errorHandler);

export default app;

