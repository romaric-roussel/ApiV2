const mysql = require('mysql')


const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password:"",
    database: 'api'
  })


  /*const pool = mysql.createPool({
    connectionLimit:10,
    host: 'db4free.net',
    user: 'romaric',
    password:"azeqsdwxc",
    port:'3306',
    database: 'apipokemons'
  })*/


 const getConnection  = () => {
    return pool
  }

  
module.exports.getConnection = getConnection