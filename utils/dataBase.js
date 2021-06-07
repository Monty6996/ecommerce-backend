const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE,
        pool: { min: 1, max: 10 },
        port: process.env.DB_PORT || 3006
    }
});

module.exports = knex;