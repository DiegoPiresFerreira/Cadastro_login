const Sequelizes = require('sequelize')
const database = require('../database/database')

const User = database.define('user',{
    id:{
        type: Sequelizes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true,
    },
    name:{
        type: Sequelizes.STRING,
        allowNull: false
    },
    email:{
        type: Sequelizes.STRING,
        allowNull: false
    },
    password:{
        type: Sequelizes.STRING,
        allowNull: false
    }

})

User.sync({force:false})
export default User