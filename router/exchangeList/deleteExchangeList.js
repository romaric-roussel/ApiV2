const express = require('express')
const exchangeRouterDelete = express.Router()
const connection = require("../../connection")



exchangeRouterDelete.delete("/exchangeList/:id", (req,res)=>{
   
    const query = "delete from liste_echange where id = ?"
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

module.exports.exchangeRouterDelete = exchangeRouterDelete