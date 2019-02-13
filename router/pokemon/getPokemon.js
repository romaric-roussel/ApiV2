const axios = require('axios')
const express = require('express')
const pokemonRouter = express.Router()



pokemonRouter.get("/pokemon", async (req,res)=>{
    let formatJson
      try {
          const allPokemon =  await getAllPokemon()
          formatJson = {status:"true",count:allPokemon.data.count,result:{data:allPokemon.data.results}}
          console.log(formatJson.result.data)
          for(let i = 0;i<20;i++){
              const onePokemon = await getIdPokemonAndImageFromName(allPokemon.data.results[i].name)
              console.log(onePokemon.data.id + "kgek")
              formatJson.result.data[i].id = onePokemon.data.id
              formatJson.result.data[i].image = onePokemon.data.sprites.front_default

          }
          res.json(formatJson)
      }catch (error){
          res.send(error)
      }
     
    
})

pokemonRouter.get("/pokemon/:id", async (req,res)=>{
    try{
        const pokemon =  await getPokemonById(req.params.id)
        let formatJson = {
            status: "true",
            result: {
                id_pokemon: pokemon.data.id,
                nom: pokemon.data.name,            
                nom_type_1: pokemon.data.types[0].type.name,
                nom_type_2: pokemon.data.types[1].type.name,
                url_image: pokemon.data.sprites.front_default
            }
        }
        res.json(formatJson)
    }catch(error){
        res.send(error)
    }
    
})


const getAllPokemon = async () => {
    
    try {
        return await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      } catch (error) {
        console.error(error)
      }
}

const getPokemonById = async (id) => {
    
    try {
        return await axios.get('https://pokeapi.co/api/v2/pokemon/'+id)
      } catch (error) {
        console.error(error)
      }
}

const getIdPokemonAndImageFromName = async (name) => {
    
    try {
        return await axios.get('https://pokeapi.co/api/v2/pokemon/'+name)
      } catch (error) {
        console.error(error)
      }
}


module.exports.pokemonRouter = pokemonRouter
