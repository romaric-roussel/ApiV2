
const pokemonGet = require('./router/pokemon/getPokemon')
const friendsGet = require('./router/friends/getFriends')
const friendsPost = require('./router/friends/postFriends')
const userGet = require('./router/users/getUsers')
const userPost = require('./router/users/postUsers')
const pokemonUserGet = require('./router/pokemonUser/getPokemonUser')
const exchangeGet = require('./router/exchangeList/getExchangeList')





const router = [pokemonGet.pokemonRouterGet
               ,userGet.userRouterGet,
                userPost.userRouterPost,
                pokemonUserGet.pokemonUserRouterGet,
                friendsGet.friendsRouterGet,
                friendsPost.friendsRouterPost,
            exchangeGet.exchangeRouterGet]


module.exports.router = router
