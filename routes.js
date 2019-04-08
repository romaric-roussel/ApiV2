
const pokemonGet = require('./router/pokemon/getPokemon')
const friendsGet = require('./router/friends/getFriends')
const friendsPost = require('./router/friends/postFriends')
const friendsDelete = require('./router/friends/deleteFriends')
const userGet = require('./router/users/getUsers')
const userPost = require('./router/users/postUsers')
const pokemonUserGet = require('./router/pokemonUser/getPokemonUser')
const exchangeListGet = require('./router/exchangeList/getExchangeList')
const exchangeListPost = require('./router/exchangeList/postExchangeList')
const exchangePost = require('./router/exchange/postExchange')
const exchangePut = require('./router/exchangeList/putExchangeList')
const exchangeDelete = require('./router/exchangeList/deleteExchangeList')







const router = [pokemonGet.pokemonRouterGet
               ,userGet.userRouterGet,
                userPost.userRouterPost,
                pokemonUserGet.pokemonUserRouterGet,
                friendsGet.friendsRouterGet,
                friendsPost.friendsRouterPost,
            exchangeListGet.exchangeListRouterGet,
        exchangeListPost.exchangeListRouterPost,
    exchangePost.exchangeRouterPost,
    exchangePut.exchangeRouterPut]
                friendsDelete.friendsRouterDelete,


module.exports.router = router
