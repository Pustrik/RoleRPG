import {createClient} from "redis";

const redisDB = createClient();

function connectRedis() {
    redisDB.connect()
        .then(() => console.log('Connected to redisDB'))
        .catch((e) => console.log('Cant connect to redisDB'));
}

export {redisDB, connectRedis};