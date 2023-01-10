import {sequelize} from "../postgre-db";
import {DataTypes} from "sequelize";
function createTables() {
    const User = sequelize.define(
        'User',
        {
            // Здесь определяются атрибуты модели
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                // allowNull по умолчанию имеет значение true
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
                // allowNull по умолчанию имеет значение true
            },
            class_id: {
                type: DataTypes.INTEGER,
            },
            created_at: {
                type: DataTypes.STRING,
            },
            updated_at: {
                type: DataTypes.STRING,
                // allowNull по умолчанию имеет значение true
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'users'
        }
    );
    const Class = sequelize.define(
        'Class',
        {
            // Здесь определяются атрибуты модели
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                // allowNull по умолчанию имеет значение true
            },
            health: {
                type: DataTypes.INTEGER,
            },
            damage: {
                type: DataTypes.INTEGER,
                // allowNull по умолчанию имеет значение true
            },
            attack_type: {
                type: DataTypes.INTEGER,
            },
            ability: {
                type: DataTypes.STRING,
            },
            created_at: {
                type: DataTypes.STRING,
            },
            updated_at: {
                type: DataTypes.STRING,
                // allowNull по умолчанию имеет значение true
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'classes'
        }
    );
    User.sync()
        .then(() => console.log('Table created'))
        .catch((e) => console.log('Cant create table', e))
    Class.sync()
        .then(() => console.log('Table created'))
        .catch((e) => console.log('Cant create table', e))
}


export default createTables;