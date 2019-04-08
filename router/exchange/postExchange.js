const express = require('express')
const exchangeRouterPost = express.Router()
const connection = require("../../connection")



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
         await getIdList(id_user_send,id_pokemon_send, (err,rows)=>{
            if(err){
                res.sendStatus(404)
                return
            }
               id_list_user_send_remove = rows[0].id_liste
               console.log("teste1 " + rows[0].id_liste)

           })
           console.log("teste " )
            console.log("teste2 " + id_list_user_send_remove)
        //id_list_user_receive_remove = await getIdList(id_user_receive,id_pokemon_receive)
        //id_list_user_send_add = await getIdList(id_user_send,id_pokemon_receive)
        //id_list_user_receive_add = await getIdList(id_user_receive,id_pokemon_send)

        //nb exemplaire du pokemon amis
        await getNbExemplaire(id_user_send,id_pokemon_send,async (err,rows)=>{
            if(err){
                res.sendStatus(404)
                return
            }
            if(rows.length > 0){
                //il reste des carte a envoyer 
                if(rows.nb_exemplaire > 0){
                    await getNbExemplaire(id_user_receive,id_pokemon_receive,async(err,rows)=>{
                        if(err){
                            res.sendStatus(404)
                            return
                        }
                        if(rows.length > 0){
                            connection.getConnection.beginTransaction((err)=>{
                                if(err){
                                    res.sendStatus(404)
                                    return 
                                }
                                connection.getConnection.query(updateUserSendQuery,[id_list_user_send_remove],(err,rows,field)=>{
                                    if(err){
                                        connection.getConnection.rollback(()=>{
                                            res.sendStatus(404)
                                            return
                                        })
                                    }
                                });
                                connection.getConnection.query(updateUserSendQuery,[id_list_user_receive_remove],(err,rows,field)=>{
                                    if(err){
                                        connection.getConnection.rollback(()=>{
                                            res.sendStatus(404)
                                            return
                                        })
                                    }
                                });
                                connection.getConnection.query(updateUserReceiveQuery,[id_list_user_send_add],(err,rows,field)=>{
                                    if(err){
                                        connection.getConnection.rollback(()=>{
                                            res.sendStatus(404)
                                            return
                                        })
                                    }
                                });
                                connection.getConnection.query(updateUserReceiveQuery,[id_list_user_receive_add],(err,rows,field)=>{
                                    if(err){
                                        connection.getConnection.rollback(()=>{
                                            res.sendStatus(404)
                                            return
                                        })
                                    }
                                });
                                connection.getConnection.commit(function(err) {
                                    if (err) { 
                                      connection.rollback(function() {
                                        throw err;
                                      });
                                    }
                                    res.status(201).send({status:"Succes",code:200})
                                    connection.getConnection.end();
                                  });
                            });
                        }
                    })
                }
            }else {
                //pas assez d'exemplaire
                res.status(404).send({status:"failed",code:404})
            }
        })
    }catch(error){
         res.json(error)
    }
});




const getNbExemplaire = async (userId,idPokemon, callBack) => {
    const getNbExemplaireQuery = "select nb_exemplaire from liste_pokemon where id_utilisateur = ? and id_pokemon = ?"
        
    connection.getConnection().query(getNbExemplaireQuery,[userId,idPokemon],(err,rows) => {
            if(err){
                callBack(err,null)
            }else {
                callBack(null,rows)
            }
        });
}

const getIdList = async (userId,idPokemon,callBack2) => {
    const query = "select id_liste from liste_pokemon where id_utilisateur = ? and id_pokemon = ?"
        
    connection.getConnection().query(query,[userId,idPokemon],(err,rows) => {
            if(err){
                callBack2(err,null)
            }else {
                callBack2(null,rows)
            }
        });
}

   


module.exports.exchangeRouterPost = exchangeRouterPost