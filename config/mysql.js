const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'rootadminer',
    password: 'Rootadminer1',
    database: 'database-sequelize'
});

module.exports = connection;