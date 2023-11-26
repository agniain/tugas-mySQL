const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'rootadminer',
    password: 'Rootadminer1',
    database: 'database-sequelize'
});

module.exports = connection;