"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'pustrik',
    password: '1',
    host: 'localhost',
    port: 5432,
    database: 'users'
});
exports.default = pool;
//# sourceMappingURL=pdb.js.map