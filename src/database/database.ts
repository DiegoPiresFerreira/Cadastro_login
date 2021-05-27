const Sequelize = require('sequelize')

const connection = new Sequelize({
    dialect:'sqlite',
    storage: __dirname + '/database.sqlite'
})

module.exports = connection;