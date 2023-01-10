import {createClient} from "redis";

const redisDB = createClient();

function connectRedis() {
    redisDB.connect()
        .then(() => console.log('Connected to redisDB'))
        .catch((e) => console.log('Cant connect to redisDB'));
    redisDB.set('messages', '[]')
        .then(() => console.log('Created key in redisDB'))
        .catch((e) => console.log('Cant create key in redisDB'));
}

export {redisDB, connectRedis};