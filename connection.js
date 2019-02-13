const mysql = require('mysql')


const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password:"",
    database: 'api'
  })

 const getConnection  = () => {
    return pool
  }

  
module.exports = getConnection