const express = require('express')
const userRouterPost = express.Router()
const connection = require("../../connection")
const bcrypt = require('bcrypt')
//const util = require('util')
const JSON = require('circular-json');



userRouterPost.post("/user", (req,res)=>{
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.email;
    const type_connexion = req.body.type_connexion;
    const photo = req.body.photo;
    const password = req.body.password;
    const query = "INSERT INTO utilisateur(nom,prenom,mail, mdp,type_connexion,photo) VALUES(?,?,?,?,?,?) "
    let hashPassword = bcrypt.hashSync(password, 10)
    connection.getConnection().query(query,[nom,prenom,mail,hashPassword,type_connexion,photo],(err,rows,field)=>{
        if(err){
            if(err.code =="ER_DUP_ENTRY"){
                 res.status(202).send("Mail adress already used")
                 return
            }else{
                res.sendStatus(500)
                return
            } 
        }else {
            res.status(201).send("Account created")
        }
        
    })
    
})

userRouterPost.post("/user/login", (req,res)=>{
    const login = req.body.login;
    const password = req.body.password;
    
    loginTest(login,password,res)
    
   
  
})

const loginTest = (login,password,response) =>{
  
    const queryGetMdp = "select mdp from utilisateur where mail = ? "
    connection.getConnection().query(queryGetMdp,[login],(err,rows,fields)=>{
            if(err){
                response.status(500).send(err.message)
                return
               
            }else {
                bcrypt.compare( password,rows[0].mdp, function(err, res) {
                    if(res) {
                     // Passwords match
                     response.status(200).send("loggin success")
                     
                    } else {
                     // Passwords don't match
                     response.status(500).send("loggin failed")
                    } 
                  });
            }
    })
   
    
    
   
    
}


module.exports.userRouterPost = userRouterPost



