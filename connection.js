const mysql = require('mysql')


const pool = mysql.createPool({
    connectionLimit:10,
    host: 'db4free.net',
    user: 'romaric',
    password:"azeqsdwxc",
    port:'3307',
    database: 'apipokemons'
  })

 const getConnection  = () => {
    return pool
  }

  
module.exports.getConnection = getConnection