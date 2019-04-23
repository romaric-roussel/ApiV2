const express = require('express')
const friendsRouterDelete = express.Router()
const connection = require("../../connection")



friendsRouterDelete.delete("/friends/:id", (req,res)=>{

    const query = "delete from amis where id_amis = ? "
    connection.getConnection().query(query,[req.params.id],(err,rows,field)=>{
        if(err){     
            res.sendStatus(404)
            return 
        }else if(rows.affectedRows == 0){
            res.sendStatus(404)
            return 
        }else {
            res.status(200).send({status:"Succes",code:200})
        }
        
    })
    
})

module.exports.friendsRouterDelete = friendsRouterDelete