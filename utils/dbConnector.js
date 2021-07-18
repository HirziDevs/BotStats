const { createPool } = require('mysql')
const yaml = require('js-yaml')
const fs = require('fs')
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'))

const connection = createPool({
	connectionLimit: 20,
	host: config.mysql.host,
	port: config.mysql.port,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database
});

module.exports = connection
