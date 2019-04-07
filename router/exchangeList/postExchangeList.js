const express = require('express')
const exchangeRouterPost = express.Router()
const connection = require("../../connection")



exchangeRouterPost.post("/exchangeList", (req,res)=>{
    const idUtilisateur = req.body.id_utilisateur;
    const idPokemon1 = req.body.id_pokemon_utilisateur_1;
    const idPokemon2 = req.body.id_pokemon_utilisateur_2;

    
    const query = "INSERT INTO liste_echange (id_utilisateur, id_pokemon_utilisateur_1, id_pokemon_utilisateur_2) VALUES (?,?,?)"
    connection.getConnection().query(query,[idUtilisateur,idPokemon1,idPokemon2],(err,rows,field)=>{
        if(err){     
            res.sendStatus(404)
            return 
        }else {
            res.status(201).send({status:"Succes",code:201})
        }
        
    })
    
})

module.exports.exchangeRouterPost = exchangeRouterPost