const mysql = require('mysql2');

const connection = mysql.createConnection({
    database: 'database-sequelize',
    host: 'localhost',
    username: 'Rootadminer',
    password: 'Rootadminer1',
});

module.exports = connection;