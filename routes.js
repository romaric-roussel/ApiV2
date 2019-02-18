
const pokemonGet = require('./router/pokemon/getPokemon')
const userGet = require('./router/users/getUsers')
const userPost = require('./router/users/postUsers')


const router = [pokemonGet.pokemonRouterGet
               ,userGet.userRouterGet,
                userPost.userRouterPost]


module.exports.router = router
console.log(router)