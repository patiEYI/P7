const mysql = require('mysql');
const connect  = require('../BDD/connect');
const fs = require('fs');


//Trouver un seul utilisateur
exports.findOneUser= (req, res) => {
    const query = req.params.userId
    console.log(query);
    const queryS = `SELECT * FROM user WHERE id = ?` ;
   
    connect.query(queryS ,query,  function (err, data, fields) {
        if (err) {
            res.status(404).send({
            message: err.message ||  "Aucun utilisateur trouvé !"
            }) 
        }else{ 
            res.send(data)
        }
    });   
   
}

//Trouver plusieurs utilisateurs
exports.findAllUsers = (req, res ) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})} 
    connect.query( "SELECT * FROM User", function (err, data, fields) {
    if (err) {
        res.status(404).send({
            message: err.message || "Aucun utilisateurs trouvé!"
        }) 
    }else{ 
            res.send(data)
        }

    })
    
}

// //Modifier un user/
exports.updateOneUser = (req, res) => {
    const query = req.params.userId
    console.log(query);
    const lastname = req.body.lastname;  console.log(lastname);
    const firstname = req.body.firstname;   console.log(firstname);
    const role = req.body.role;   console.log(role);
    const image_url = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";
    console.log(image_url);
    const queryS = `UPDATE user SET lastname = ? , firstname = ? , role = ? , image_url = ? WHERE id = ${query} `;
    const inserts = [lastname, firstname, role , image_url];

        connect.query(queryS, inserts,  function (err, results  , fields) {
            if (err) {
                res.status(404).send({
                    message: err.message ||  "Aucun utilisateur trouvé !"
                }) 
            }
            else{ 
               res.status(200).json({ message: "ok utilisateur modifier !"});
                console.log("La solution est: ", results);
                
            }

        }); 
   
       

}

// //Supprimer un utilisateur
exports.deleteOneUser = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    const query = req.params.userId; 
    console.log(query);
    const queryS = `DELETE FROM User WHERE id = ${query} ` ;

    connect.query(`SELECT * FROM User WHERE id = ${query}`, function(err, rows, fields) {
        if(err){
            res.status(500).json({err: err.message})
        }else if(rows[0].image_url){
            const filename = rows[0].image_url.split("/images/")[1];
    
            fs.unlink(`images/${filename}`, (err,res) => {
                if (err){
                    res.status(500).json({err:err.message})
                }
                connect.query(queryS, function (err, results, fields) {
                    if (err) {
                        res.status(404).send({
                            message: err.message ||  "Aucun utilisateur trouvé !"
                        }) 
                    }
               })
                
            });
        }else{  
            connect.query(queryS, function (err, fields) {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Quelque chose s'est cassé !"
                    }) 
                }else{
                    res.status(200).json({ message: "ok utilisateur supprimé !"});
                    
                }
            }) 
        }
    })   
    
}

// //Supprimer tous les utilisateurs
exports.deleteAllUsers = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    connect.query( "DELETE FROM user", function (err, results, fields) {
        if (err) {
            res.status(404).send({
                message: err.message || "Aucun utilisateurs à supprimé!"
            }) 
        }else{ 
            res.status(200).json({ message: "Tous les Utilisateurs ont été supprimé  !"});
                console.log("La solution: ", results);
        }

    });
   
}