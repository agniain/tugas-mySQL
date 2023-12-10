const {Sequelize} = require('sequelize');
const mysql = require('mysql2');

const sequelize = new Sequelize('sql12669230', 'sql12669230','gVrfWyWgYS', {
  host: 'sql12.freesqldatabase.com',
  dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

module.exports = sequelize