
const pokemonGet = require('./router/pokemon/getPokemon')
const friendsGet = require('./router/friends/getFriends')
const friendsPost = require('./router/friends/postFriends')
const friendsDelete = require('./router/friends/deleteFriends')
const userGet = require('./router/users/getUsers')
const userPost = require('./router/users/postUsers')
const pokemonUserGet = require('./router/pokemonUser/getPokemonUser')
const exchangeGet = require('./router/exchangeList/getExchangeList')
const exchangePost = require('./router/exchangeList/postExchangeList')
const exchangePut = require('./router/exchangeList/putExchangeList')
const exchangeDelete = require('./router/exchangeList/deleteExchangeList')






const router = [pokemonGet.pokemonRouterGet
               ,userGet.userRouterGet,
                userPost.userRouterPost,
                pokemonUserGet.pokemonUserRouterGet,
                friendsGet.friendsRouterGet,
                friendsPost.friendsRouterPost,
                friendsDelete.friendsRouterDelete,
            exchangeGet.exchangeRouterGet,
        exchangePost.exchangeRouterPost,
    exchangePut.exchangeRouterPut,
exchangeDelete.exchangeRouterDelete]


module.exports.router = router
