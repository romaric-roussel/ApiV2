
const pokemonGet = require('./router/pokemon/getPokemon')
const friendsGet = require('./router/friends/getFriends')
const friendsPost = require('./router/friends/postFriends')
const userGet = require('./router/users/getUsers')
const userPost = require('./router/users/postUsers')
const pokemonUserGet = require('./router/pokemonUser/getPokemonUser')
const exchangeListGet = require('./router/exchangeList/getExchangeList')
const exchangeListPost = require('./router/exchangeList/postExchangeList')
const exchangePost = require('./router/exchange/postExchange')
const exchangePut = require('./router/exchangeList/putExchangeList')







const router = [pokemonGet.pokemonRouterGet
               ,userGet.userRouterGet,
                userPost.userRouterPost,
                pokemonUserGet.pokemonUserRouterGet,
                friendsGet.friendsRouterGet,
                friendsPost.friendsRouterPost,
            exchangeListGet.exchangeListRouterGet,
        exchangeListPost.exchangeListRouterPost,
    exchangePost.exchangeRouterPost]
    exchangePut.exchangeRouterPut]


module.exports.router = router
