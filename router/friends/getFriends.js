const express = require('express')
const friendsRouterGet = express.Router()
const connection = require("../../connection")


friendsRouterGet.get("/user/:id/friends", (req,res)=>{
    const query = "SELECT id_utilisateur2 as idAmis ,nom,prenom,mail,photo from amis LEFT JOIN utilisateur on utilisateur.id_utilisateur = amis.id_utilisateur2 where id_utilisateur1 = ?"
    connection.getConnection().query(query,[req.params.id],(err,rows,fiels)=>{
        if(err){
            res.sendStatus(404)
            return
        }else {
            res.json(rows)
        }
    })
    
})


module.exports.friendsRouterGet = friendsRouterGet