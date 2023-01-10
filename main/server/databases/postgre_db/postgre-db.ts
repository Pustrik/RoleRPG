import {Pool} from 'pg';
import dotenv from 'dotenv';
import {DataTypes, Model, Sequelize} from "sequelize";
import User from "./models/user-model";
import createUserTable from "./models/user-model";
dotenv.config();

const postgreDB = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE
});
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})
function connectPostgre() {
    postgreDB.connect()
        .then(() => console.log('Connected to postgreDB'))
        .catch((e) => console.log('Cant connect to postgreDB'));
}
function createTablesPDB() {
    sequelize.authenticate()
        .then(() => console.log('Can create'))
        .catch((e) => console.log('Cant create'));
    createUserTable();
}

export {postgreDB, sequelize, connectPostgre, createTablesPDB};
