import {postgreDB} from "../databases/postgre_db/postgre-db";
import IUserPDB from "../../interfaces/i-user-pdb";
import getCurrentDate from "../utills/current-time-utill";
import IClassPDB from "../../interfaces/i-class-pdb";
export async function addUser(id: string, username: string, email: string, password: string, class_id: string): Promise<IUserPDB> {
    const user_data = await postgreDB
        .query(`INSERT INTO users(id, username, email, password, class_id, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [id, username, email, password, class_id, getCurrentDate(), getCurrentDate()]);
    return user_data.rows[0];
}

export async function getAllUsers(): Promise<IUserPDB[]> {
    const users = await postgreDB.query(`SELECT * FROM users`);
    return users.rows;
}

export async function getUserByUsername(username: string): Promise<IUserPDB> {
    const user_data = await postgreDB.query(`SELECT * FROM users where username = $1`, [username]);
    return user_data.rows[0];
}
export async function getUserById(id: string): Promise<IUserPDB> {
    const user_data = await postgreDB.query(`SELECT * FROM users where id = $1`, [id]);
    return user_data.rows[0];
}

export async function updateUser(id: string, username: string, password: string, class_id: number): Promise<IUserPDB> {
    const user_data = await postgreDB.query(`UPDATE users set username = $1, password = $2, class_id = $3, updated_at = $4 where id = $5 RETURNING *`,
        [username, password, class_id, getCurrentDate(), id]);
    return user_data.rows[0];
}

export async function deleteUser(id: string): Promise<IUserPDB> {
    const user_data = await postgreDB.query(`DELETE FROM users where id = $4 RETURNING *`, [id]);
    return user_data.rows[0];
}

export async function addClass(id: number, name: string, health: number, damage: number, attack_type: number, ability: string): Promise<IClassPDB> {
    const class_data = await postgreDB
        .query(`INSERT INTO classes(id, name, health, damage, attack_type, ability, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [id, name, health, damage, attack_type, ability, getCurrentDate(), getCurrentDate()]);
    return class_data.rows[0];
}

export async function getClassById(id: number): Promise<IClassPDB> {
    const class_data = await postgreDB.query(`SELECT * FROM classes where id = $1`, [id]);
    return class_data.rows[0];
}

export async function updateClass(id: number, name: string, health: number, damage: number, attack_type: number, ability: string): Promise<IUserPDB> {
    const class_data = await postgreDB.query(`INSERT INTO classes(id, name, health, damage, attack_type, ability, updated_at) values($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [id, name, health, damage, attack_type, ability, getCurrentDate()]);
    return class_data.rows[0];
}
