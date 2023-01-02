import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const postgreDB = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE
});

function connectPostgre() {
    postgreDB.connect()
        .then(() => console.log('Connected to postgreDB'))
        .catch((e) => console.log('Cant connect to postgreDB'));
}

export {postgreDB, connectPostgre};
