const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('nodejs', 'root', 'mysql', {
  host: 'localhost',
  dialect: "mysql"
});

module.exports = sequelize;

