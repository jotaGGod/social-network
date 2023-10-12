const { dotenv } = require('dotenv');
const { Sequelize } = require('sequelize');

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

module.exports = sequelize

//função para verificar a conexão com o bando de dados

/*
sequelize.authenticate()
.then(function(){     console.log("connected database successfully") })
.catch(function(){     console.log("Error: couldn't connect database") })
*/