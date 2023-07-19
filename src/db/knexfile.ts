import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: "db-1.cxsxxfec5etr.us-east-2.rds.amazonaws.com",
            port: 5432,
            database: "medgest",
            user: "kengan",
            password: "Peraza24.",
        },

        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations',
        }
    }
};