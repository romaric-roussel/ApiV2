const axios = require('axios')
const express = require('express')
const connection = require("../../connection")
const pokemonUserRouterGet = express.Router()

 pokemonUserRouterGet.get("/user/:id/pokemon", async (req,res)=>{
   let formatJson
     try{
             await getAllUserPokemon(req.params.id,async(err,rows) => {
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
                    const onePokemon = await getPokemonById(rows[i].id_pokemon)
                    let result = {id_list:"",id:"",image:"",name:"",nb_exemplaire:""}
                    result.id_list = rows[i].id_liste
                    result.id = onePokemon.data.id
                    result.image = onePokemon.data.sprites.front_default
                    result.name = onePokemon.data.name
                    result.nb_exemplaire = rows[i].nb_exemplaire
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


const getAllUserPokemon = async (userId, callBack) => {
    const query = "select id_liste,id_pokemon,nb_exemplaire from liste_pokemon where id_utilisateur = ? and nb_exemplaire > 0"
        
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

module.exports.pokemonUserRouterGet = pokemonUserRouterGet
