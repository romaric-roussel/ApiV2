const express = require('express')
const userRouter = express.Router()
const connection = require("../../connection")


userRouter.get("/user", (req,res)=>{
    const query = "select * from utilisateur"
    connection.getConnection().query(query,(err,rows,fiels)=>{
        if(err){
            res.sendStatus(500)
            return
        }else {
            res.json(rows)
        }
    })
    
})


module.exports.userRouter = userRouter



