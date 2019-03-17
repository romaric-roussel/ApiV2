
const pokemonGet = require('./router/pokemon/getPokemon')
const userGet = require('./router/users/getUsers')
const userPost = require('./router/users/postUsers')
const pokemonUserGet = require('./router/pokemonUser/getPokemonUser')



const router = [pokemonGet.pokemonRouterGet
               ,userGet.userRouterGet,
                userPost.userRouterPost,
                pokemonUserGet.pokemonUserRouterGet]


module.exports.router = router
