const express = require('express')
const exchangeRouterPut = express.Router()
const connection = require("../../connection")



exchangeRouterPut.put("/exchangeList", (req,res)=>{
    const idListe = req.body.id_list;
    const idPokemon1 = req.body.id_pokemon_utilisateur_1;
    const idPokemon2 = req.body.id_pokemon_utilisateur_2;

    
    const query = "update liste_echange set id_pokemon_utilisateur_1 = ?, id_pokemon_utilisateur_2 = ? where id = ?"
    connection.getConnection().query(query,[idPokemon1,idPokemon2,idListe],(err,rows,field)=>{
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

module.exports.exchangeRouterPut = exchangeRouterPut