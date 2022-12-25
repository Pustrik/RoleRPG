import RedisClient from "@redis/client/dist/lib/client";
import {createClient} from "redis";


export const redisDB = createClient();