const express = require('express')
const userRouterGet = express.Router()
const connection = require("../../connection")


userRouterGet.get("/user", (req,res)=>{
    const query = "select * from utilisateur"
    connection.getConnection().query(query,(err,rows,fiels)=>{
        if(err){
            res.sendStatus(404)
            return
        }else {
            res.json(rows)
        }
    })
    
})


module.exports.userRouterGet = userRouterGet



