const mysql = require('mysql')
//var util = require("util");

/*const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password:"",
    database: 'api'
  })*/
  //pool.query = util.promisify(pool.query);

  const pool = mysql.createPool({
    connectionLimit:10,
    timeout : 60 * 60 * 10000,
    host: 'db4free.net',
    user: 'romaric',
    password:"azeqsdwxc",
    port:'3306',
    database: 'apipokemons'
  })


 const getConnection  = () => {
    return pool
  }

  
module.exports.getConnection = getConnection