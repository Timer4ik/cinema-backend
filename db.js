const { Sequelize } = require("sequelize")

const db = new Sequelize({
    database:"cinema",
    dialect:"postgres",
    host:"localhost",
    port:"5432",
    username:"postgres",
    password:"1234"
})

module.exports = db