const express = require('express')
const friendsRouterPost = express.Router()
const connection = require("../../connection")



friendsRouterPost.post("/friends", (req,res)=>{
    const idUtilisateur1 = req.body.idUtilisateur1;
    const idUtilisateur2 = req.body.idUtilisateur2;
    
    const query = "INSERT INTO amis(id_utilisateur1,id_utilisateur2) VALUES(?,?) "
    connection.getConnection().query(query,[idUtilisateur1,idUtilisateur2],(err,rows,field)=>{
        if(err){     
            res.sendStatus(404)
            return 
        }else {
            res.status(201).send({status:"Succes",code:201})
        }
        
    })
    
})

module.exports.friendsRouterPost = friendsRouterPost