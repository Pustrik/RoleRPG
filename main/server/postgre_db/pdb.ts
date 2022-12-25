import {Pool} from 'pg'
const pool = new Pool({
    user: 'pustrik',
    password: '1',
    host: 'localhost',
    port: 5432,
    database: 'users'
});

export default pool;
