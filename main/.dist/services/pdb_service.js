"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUserByUsername = exports.getAllUsers = exports.addUser = void 0;
const pdb_1 = __importDefault(require("../postgre_db/pdb"));
async function addUser(id, username, email, password, class_id) {
    const user_data = await pdb_1.default
        .query(`INSERT INTO user_rpg(id, username, email, password, class_id) values($1, $2, $3, $4, $5) RETURNING *`, [id, username, email, password, class_id]);
    return user_data.rows[0];
}
exports.addUser = addUser;
async function getAllUsers() {
    const users = await pdb_1.default.query(`SELECT * FROM user_rpg`);
    return users;
}
exports.getAllUsers = getAllUsers;
async function getUserByUsername(username) {
    const user_data = await pdb_1.default.query(`SELECT * FROM user_rpg where username = $1`, [username]);
    return user_data.rows[0];
}
exports.getUserByUsername = getUserByUsername;
async function getUserById(id) {
    const user_data = await pdb_1.default.query(`SELECT * FROM user_rpg where id = $1`, [id]);
    return user_data.rows[0];
    ;
}
exports.getUserById = getUserById;
async function updateUser(id, username, password, class_id) {
    const user_data = await pdb_1.default.query(`UPDATE user_rpg set username = $1, password = $2, class_id = $3 where id = $4 RETURNING *`, [username, password, class_id, id]);
    return user_data.rows[0];
}
exports.updateUser = updateUser;
async function deleteUser(id) {
    const user_data = await pdb_1.default.query(`DELETE FROM user_rpg where id = $4 RETURNING *`, [id]);
    return user_data.rows[0];
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=pdb_service.js.map