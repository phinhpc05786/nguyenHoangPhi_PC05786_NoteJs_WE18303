// kết nối cơ sỡ dữ liệu

const sequelize = require("./Database.js");

// sử dụng đối tượng dât tyoes của sequelize
const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING,
      email:{
        type: DataTypes.STRING,
        aloloNull: false
      },
      description: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        aloloNull: false
      },
      phone: DataTypes.INTEGER,
      img: DataTypes.STRING,
}, {
    timestamps: false
  })