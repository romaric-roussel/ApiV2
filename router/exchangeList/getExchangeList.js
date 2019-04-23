const express = require('express')
const exchangeListRouterGet = express.Router()
const connection = require("../../connection")
const axios = require('axios')




exchangeListRouterGet.get("/exchangeList/user/:id", async (req,res)=>{
    let formatJson
      try{
              await getAllExchangeListUser(req.params.id,async(err,rows) => {
              try {
                  if(err){
                  res.sendStatus(500)
                  return
                  }else if(rows.length < 1){
                    res.sendStatus(404)
                    return
              }else {
                 formatJson = {status:"true",result:{data:[]}}
                 for(let i = 0;i<rows.length;i++){
                     const pokemonUser1 = await getPokemonById(rows[i].id_pokemon_utilisateur_1)
                     const pokemonUser2 = await getPokemonById(rows[i].id_pokemon_utilisateur_2)
                     let result = {id_list:"",id_pokemon_utilisateur_1:"",image_pokemon_utilisateur_1:"",name_pokemon_utilisateur_1:"",
                     id_pokemon_utilisateur_2:"",image_pokemon_utilisateur_2:"",name_pokemon_utilisateur_2:""}

                     result.id_list = rows[i].id
                     result.id_pokemon_utilisateur_1 = pokemonUser1.data.id
                     result.image_pokemon_utilisateur_1 = pokemonUser1.data.sprites.front_default
                     result.name_pokemon_utilisateur_1 = pokemonUser1.data.name
                     result.id_pokemon_utilisateur_2 = pokemonUser2.data.id
                     result.image_pokemon_utilisateur_2 = pokemonUser2.data.sprites.front_default
                     result.name_pokemon_utilisateur_2 = pokemonUser2.data.name
                     formatJson.result.data[i] = result
                 }
                 res.json(formatJson)
                 //res.json(rows)
              }
             }catch(error){
                 res.json(error)
             }
          })
      }catch(error){
          res.json(error)
      }
  })
 
 
 const getAllExchangeListUser = async (userId, callBack) => {
     const query = "SELECT * FROM liste_echange where id_utilisateur = ?"
         
     connection.getConnection().query(query,[userId],(err,rows) => {
             if(err){
                 callBack(err,null)
             }else {
                 callBack(null,rows)
             }
         })
 }

const getPokemonById = async (id) => {
    
    try {
        return await axios.get('https://pokeapi.co/api/v2/pokemon/'+id)
      } catch (error) {
        console.error(error)
      }
}



module.exports.exchangeListRouterGet = exchangeListRouterGet