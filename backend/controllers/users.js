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
            message: err.message ||  "No user found !"
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
            message: err.message || "No user found!"
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
    const queryS = `UPDATE user SET lastname = ? , firstname = ? , role = ? WHERE id = ${query} `;
    const inserts = [lastname, firstname, role];
       if(req.body.image_url) {
            connect.query(`UPDATE user SET image_url = ? WHERE id = ${query} `,  function (err, results  , fields) {
                if (err) {
                    res.status(404).send({
                        message: err.message ||  "No user found !"
                    }) 
                }
                else{ 
                res.status(200).json({ message: "Ok update image!"});
                    console.log("result: ", results);
                    
                }

            });

       }

    connect.query(queryS, inserts,  function (err, results  , fields) {
        if (err) {
            res.status(404).send({
                message: err.message ||  "No user found!"
            }) 
        }
        else{ 
            console.log("result: ", results);
            res.status(200).json({ message: "Ok update user !"});  
        }

    });      

}

// //Supprimer un utilisateur
exports.deleteOneUser = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests !"})}
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
                            message: err.message ||  "No user found!"
                        }) 
                    }
               })
                
            });
        }else{  
            connect.query(queryS, function (err, fields) {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Something broke !"
                    }) 
                }else{
                    res.status(200).json({ message: "Ok user deleted !"});
                    
                }
            }) 
        }
    })   
    
}

// //Supprimer tous les utilisateurs
exports.deleteAllUsers = (req, res) => {
    connect.query( "DELETE FROM user", function (err, results, fields) {
        if (err) {
            res.status(404).send({
                message: err.message || "No user found!"
            }) 
        }else{ 
            res.status(200).json({ message: "Ok all users deleted  !"});
                
        }

    });
   
}