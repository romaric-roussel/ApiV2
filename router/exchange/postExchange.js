const express = require('express')
const exchangeRouterPost = express.Router()
const connection = require("../../connection")
//const Promise = ('bluebird');



exchangeRouterPost.post("/exchange", async (req,res)=>{

    
    const id_user_send = req.body.id_user_send
    const id_user_receive = req.body.id_user_receive
    const id_pokemon_send = req.body.id_pokemon_send
    const id_pokemon_receive = req.body.id_pokemon_receive;
    let id_list_user_send_remove ;
    let id_list_user_receive_remove ;
    let id_list_user_send_add ;
    let id_list_user_receive_add ;

    const updateUserSendQuery = "update liste_pokemon set nb_exemplaire = nb_exemplaire - 1 where id_liste = ?"
    const updateUserReceiveQuery = "update liste_pokemon set nb_exemplaire = nb_exemplaire + 1 where id_liste = ?"
    try {
        
        id_list_user_send_remove = await getIdList(id_user_send,id_pokemon_send)
        id_list_user_receive_remove = await getIdList(id_user_receive,id_pokemon_receive)
        id_list_user_send_add = await getIdList(id_user_send,id_pokemon_receive)
        id_list_user_receive_add = await getIdList(id_user_receive,id_pokemon_send)

        //nb exemplaire du pokemon amis
       
            const rows_user_send_pokemon_send = await getNbExemplaire(id_user_send,id_pokemon_send)
            //console.log("send" + rows_user_send_pokemon_send.length)
            
            if(rows_user_send_pokemon_send.length > 0){
                //il reste des carte a envoyer 
                
                if(rows_user_send_pokemon_send[0].nb_exemplaire > 0){
                    const rows_user_receive_pokemon_receive = await getNbExemplaire(id_user_receive,id_pokemon_receive)
                    //console.log(rows_user_receive_pokemon_receive)
                    
                    if(rows_user_receive_pokemon_receive.length > 0){
         
                        connection.getConnection().getConnection(function(err, connection) {
                        connection.beginTransaction(async(err)=>{
                            if(err){
                                console.log(err)
                                connection.rollback(function() {
                                    connection.release();
                                    //Failure
                                    res.sendStatus(404)
                                return 
                                });                                                       
                            }else {
                                connection.query(updateUserSendQuery,[id_list_user_send_remove],(err,rows,field)=>{
                                    if(err){
                                        console.log(err)
                                        connection.rollback(()=>{
                                            connection.release()
                                            res.sendStatus(404)
                                            return
                                        })
                                    } else {
                                        connection.query(updateUserSendQuery,[id_list_user_receive_remove],(err,rows,field)=>{
                                            if(err){
                                                connection.rollback(()=>{
                                                    connection.release()
                                                    res.sendStatus(404)
                                                    return
                                                })
                                            } else {
                                                connection.query(updateUserReceiveQuery,[id_list_user_send_add],(err,rows,field)=>{
                                                    if(err){
                                                        connection.rollback(()=>{
                                                            connection.release()
                                                            res.sendStatus(404)
                                                            return
                                                        })
                                                    } else {
                                                        connection.query(updateUserReceiveQuery,[id_list_user_receive_add],(err,rows,field)=>{
                                                            if(err){
                                                                connection.rollback(()=>{
                                                                    connection.release()
                                                                    
                                                                    res.sendStatus(404)
                                                                    return
                                                                })
                                                            } else {
                                                                connection.commit(function(err) {
                                                                    if (err) {
                                                                        connection.rollback(function() {
                                                                            connection.release();
                                                                            //Failure
                                                                        });
                                                                    } else {
                                                                        connection.release();
                                                                       
                                                                        res.status(200).send({status:"Succes",code:200})
                                                                        //Success
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                                
                        })
                        })
                    }
                    
                }
                
            }
            
    }catch(error){
        res.send(error).status(404)
    }
});
    




const getNbExemplaire = async (userId,idPokemon) => {
    const promise = await new Promise((resolve,reject)=>{
    const getNbExemplaireQuery = "select nb_exemplaire from liste_pokemon where id_utilisateur = ? and id_pokemon = ?"
    connection.getConnection().query(getNbExemplaireQuery,[userId,idPokemon],(err,rows) => {
            if(err){
                reject(err)
            }else {
                resolve(rows)
            }
        });
    })
    return promise
}



const getIdList = async (userId,idPokemon) => {
   const promise = await new Promise((resolve,reject)=>{
        const query = "select id_liste from liste_pokemon where id_utilisateur = ? and id_pokemon = ?"
        connection.getConnection().query(query,[userId,idPokemon],(err,rows) => {
            if(err){
                reject(err)
            }else if (rows.length < 1){
                reject(404)
            }else{
                 resolve(rows[0].id_liste)
            }
            
        });
    })
    return promise
}



 
    
  
   




   


module.exports.exchangeRouterPost = exchangeRouterPost