const express = require('express')
const morgan = require('morgan')
const axios = require('axios')
const bodyParser= require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('combined'))


app.get("/pokemon", async (req,res)=>{
      getAllPokemon()
      .then(response => res.json(response.data))
      .catch(err =>res.send(err)) 
})


const getAllPokemon = async () => {
    
    try {
        return await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      } catch (error) {
        console.error(error)
      }
}

    

app.listen(3003,()=> {
    console.log("Server is running on 3003")
})