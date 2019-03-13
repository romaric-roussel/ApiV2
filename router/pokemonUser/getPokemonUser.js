const axios = require('axios')
const express = require('express')
const connection = require("../../connection")
const pokemonUserRouterGet = express.Router()

 pokemonUserRouterGet.get("/user/:id/pokemon", async (req,res)=>{
   
     try{
             await getAllUserPokemon(req.params.id,(err,rows) => {
             if(err){
                 res.sendStatus(500)
                 return
             }else {
                 res.json(rows)
             }
         })
     }catch(error){
         res.json(error)
     }
 })


const getAllUserPokemon = async (userId, callBack) => {
    const query = "select id_pokemon,nb_exemplaire from liste_pokemon where id_utilisateur = ?"
        
         connection.getConnection().query(query,[userId],(err,rows) => {
            if(err){
                callBack(err,null)
            }else {
                callBack(null,rows)
            }
        })
}

module.exports.pokemonUserRouterGet = pokemonUserRouterGet
