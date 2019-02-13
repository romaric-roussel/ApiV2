
const pokemon = require('./router/pokemon/getPokemon')
const user = require('./router/users/getUsers')

const router = [pokemon.pokemonRouter,user.userRouter]


module.exports.router = router
console.log(router)