import { knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
    },
});

export default db;