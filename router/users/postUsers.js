const express = require('express')
const userRouterPost = express.Router()
const connection = require("../../connection")
const bcrypt = require('bcrypt')
const mail = require('../../mail')
const generator = require('generate-password');
//const JSON = require('circular-json')






userRouterPost.post("/user",  (req,res)=>{
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.email;
    const type_connexion = req.body.type_connexion;
    const photo = req.body.photo;
    const password = req.body.password;
    const query = "INSERT INTO utilisateur(nom,prenom,mail, mdp,type_connexion,photo) VALUES(?,?,?,?,?,?) "
    let hashPassword = bcrypt.hashSync(password, 10)
    connection.getConnection().query(query,[nom,prenom,mail,hashPassword,type_connexion,photo],async(err,rows,field)=>{
        if(err){
            if(err.code =="ER_DUP_ENTRY"){
                 res.status(404).send({status:"Mail adress already used",code:404})
                 return
            }else{
                res.sendStatus(404)
                return
            } 
        }else {
            await putUserPokemonDefaultValue(rows.insertId)
            res.status(201).send({status:"Account created",code:201})
        }
        
    })
    
})

userRouterPost.post("/user/login", (req,res)=>{
    const login = req.body.login;
    const password = req.body.password;
    
    loginTest(login,password,res)
    
   
  
})

userRouterPost.post("/user/forgetPassword", (req,res)=>{
    const login = req.body.login;
    const password = generator.generate({
        length: 10,
        numbers: true
    });
    const query = "update utilisateur set mdp =? where id_utilisateur = (select id_utilisateur from (select * from utilisateur ) as UT where mail = ? and type_connexion = 3)"
    mail.mailOptions.to = login
    mail.mailOptions.text = "here your new password : " + password
    connection.getConnection().query(query,[bcrypt.hashSync(password,10),login],(err,rows,field)=>{
        if(err){           
            res.status(404).send({status:err.message,code:404})
            return
        }else {
            res.status(200).send({status:"User updated",code:200})
        }  
    })
    mail.sendMail(res)
})

const loginTest = (login,password,response) =>{
  
    const queryGetMdp = "select mdp from utilisateur where mail = ? "
    const queryGetUserId = "select * from utilisateur where mail = ? and mdp = ? "

    connection.getConnection().query(queryGetMdp,[login],(errMdp,rowsMdp,fieldsMdp)=>{
            if(errMdp){
                response.status(404).send({status:errMdp.message,code:404})
                return
               
            }else {
                if(rowsMdp.length < 1){
                    response.status(400).send({status:"Mail adress unknow",code:404})
                    return
                }
                bcrypt.compare( password,rowsMdp[0].mdp, function(err, res) {
                    if(res) {
                     // Passwords match
                     connection.getConnection().query(queryGetUserId,[login,rowsMdp[0].mdp],async (errId,rowsId,fieldsId)=>{
                         if(errId){
                             response.status(404).send({status:errId.message,code:404})
                         }else{
                             //check 1ere co
                             let newAcc = await checkNewAccount(rowsId[0].id_utilisateur)
                             if(newAcc == 1){
                                //donner pokemon et change bool
                                        await randomStarter(rowsId[0].id_utilisateur)
                            }
                                    
                             //rowsId[0].id_utilisateur
                            response.status(200).send({status:"Succes",code:200,id:rowsId[0].id_utilisateur,nom:rowsId[0].nom,prenom:rowsId[0].prenom,mail:rowsId[0].mail,photo:rowsId[0].photo})
                         }
                     })
                    } else {
                     // Passwords don't match
                     response.status(404).send({status:"Loggin or password incorrect",code:404})
                    } 
                  });
            }
    })
   
    

   
    
}

const putUserPokemonDefaultValue = async (userId) => {
    const promise = await new Promise((resolve,reject)=>{
         const query = "CALL defaultValueNbExemplaire(?)"
         connection.getConnection().query(query,[userId],(err,rows) => {
             if(err){
                 reject(err)
             }else{
                  resolve()
             }
             
         });
     })
     return promise
 }

 const checkNewAccount = async (userId) => {
    const promise = await new Promise((resolve,reject)=>{
         const query = "select new_account from utilisateur where id_utilisateur = ?"
         connection.getConnection().query(query,[userId],(err,rows) => {
             if(err){
                 reject(err)
             }else{
                  resolve(rows[0].new_account)
             }
             
         });
     })
     return promise
 }

 const randomStarter = async (userId) => {
    const promise = await new Promise((resolve,reject)=>{
         const query = "Call RandomStarter(?,?,?,?,?,?)"
         const poke1 = getRandomInt(150)
         const poke2 = getRandomInt(150)
         const poke3 = getRandomInt(150)
         const poke4 = getRandomInt(150)
         const poke5 = getRandomInt(150)

         connection.getConnection().query(query,[userId,poke1,poke2,poke3,poke4,poke5],(err,rows) => {
             if(err){
                 reject(err)
             }else{
                  resolve()
             }
             
         });
     })
     return promise
 }

 function getRandomInt(max) {
    let res
    do{
         res = Math.floor(Math.random() * Math.floor(max))
     } while (res < 1)
     
    return res
   
  }




module.exports.userRouterPost = userRouterPost



