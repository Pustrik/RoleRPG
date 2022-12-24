import pool from "../postgre_db/pdb";
import {User} from "../models/user_pdb";
export async function addUser(id: string, username: string, email: string, password: string, class_id: string): Promise<User> {
    const user_data = await pool
        .query(`INSERT INTO user_rpg(id, username, email, password, class_id) values($1, $2, $3, $4, $5) RETURNING *`,
            [id, username, email, password, class_id]);
    return user_data.rows[0];
}

export async function getAllUsers() {
    const users = await pool.query(`SELECT * FROM user_rpg`);
    return users;
}

export async function getUserByUsername(username: string): Promise<User> {
    const user_data = await pool.query(`SELECT * FROM user_rpg where username = $1`, [username]);
    return user_data.rows[0];
}
export async function getUserById(id: string): Promise<User> {
    const user_data = await pool.query(`SELECT * FROM user_rpg where id = $1`, [id]);
    return user_data.rows[0];;
}

export async function updateUser(id: string, username: string, password: string, class_id: number): Promise<User> {
    const user_data = await pool.query(`UPDATE user_rpg set username = $1, password = $2, class_id = $3 where id = $4 RETURNING *`,
        [username, password, class_id, id]);
    return user_data.rows[0];
}

export async function deleteUser(id: string): Promise<User> {
    const user_data = await pool.query(`DELETE FROM user_rpg where id = $4 RETURNING *`, [id]);
    return user_data.rows[0];
}