const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    database: 'database-sequelize',
    host: 'localhost',
    username: 'rootadminer',
    password: 'Rootadminer1',
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