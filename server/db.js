const Pool = require('pg').Pool
require('dotenv').config()

//this code helps us communicate with our database
//we need to provide the user, password, host, port, and database name
//we can get the user, password, and database name from the .env file
const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: 'todo_app'
})

module.exports = pool