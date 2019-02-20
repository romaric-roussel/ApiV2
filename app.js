const express = require('express')
const morgan = require('morgan')
const axios = require('axios')
const bodyParser= require('body-parser')
const app = express()
const Pokedex = require('pokedex-promise-v2');
const route = require('./routes')

let P = new Pokedex();


 //connection mysql
 

 /* const queryString = "SELECT idPlante,id_image,nomFr,nomLatin,url, usageMilieu from plante inner JOIN image on plante.id_image = image.idImage "
  connectionAsync.query(queryString,(err,rows,fields)=> {
    if (err){
      console.log("error " + err)
      res.sendStatus(204)
      return
    }
    const plante = rows.map((row) => {
      return {idPlante:row.idPlante, nomFr:row.nomFr,nomLatin:row.nomLatin, usageMilieu:row.usageMilieu,
        image :{idImage:row.id_image,url:row.url}}
    })
    res.json(plante)
  }) */


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(route.router)


    

//localhost:4000
app.listen(process.env.PORT || 4000, function(){
  console.log('Your node js server is running');
});