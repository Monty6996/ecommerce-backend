const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		pool: { min: 1, max: 10 },
		port: process.env.DB_PORT,
	},
});

knex.on('query', (queryData) => {
	console.log(queryData.sql);
});

module.exports = knex;
