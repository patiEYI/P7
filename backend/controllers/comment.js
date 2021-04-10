const mysql = require("mysql");
const connect  = require('../BDD/connect');

//Crée un commentaire
exports.createComment = (req, res) => {
    console.log(req.body);
    const msg_comment = req.body.msg_comment;
    const post_id = req.body.post_id; 
    const user_id = req.body.user_id
    const queryS = `INSERT INTO comment SET date = NOW(), msg_comment = ? , post_id = ? , user_id = ?`;
    const inserts = [ msg_comment, post_id, user_id]
    connect.query( queryS, inserts, (err, results , fields) => {
        if (err) {
            res.status(404).send({
                message: err.message ||  "impossible to create comment !"
            }) 
        }else{
            res.status(200).json({ message: "Ok comment created !"});
            console.log("La solution : ", results);
        }
        
    })
    
}

//Récupérer tous les commentaires
exports.findAllComment = (req, res) => {
    const queryS =  "SELECT id , date , CONCAT_WS(' ', DAY(date),'/',MONTH(date),'/', YEAR(date) , ' à ', TIME(date)) AS date_comment, msg_comment, post_id, user_id FROM Comment";
    connect.query(queryS, (err, data, results, fields) => {
        if (err) { 
            console.log("error: ", err);
            result(err, null);
            res.status(404).send({
            message: err.message || "No comment found!"
            })
            return;
        }
        console.log("results : ", results);
        res.send(data)
    }) 
}

//Trouver un seul commentaire
exports.findOneComment = (req, res) => {
    const query = req.params.id; 
    connect.query(`SELECT * FROM Comment WHERE id = ${query}` , (err, results , fields) => {
        if (err) {
            res.status(404).send({
                message: err.message || "impossible to found comment !"
            }) 
        }else{
            console.log("result : ", results);
            res.status(200).json({ message: "Ok comment found!"});
            
        }
        
    })
}

//Modifier un commentaire
exports.updateOneComment = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests !"})}
    const query = req.params.id;
    const msg_comment= req.body.comment;
    const post_id = req.body.post_id; 
    const user_id = req.body.user_id

    const queryS = `UPDATE Comment SET date = NOW(), msg_comment = ? , post_id = ? , user_id = ? WHERE id = ${query}`;//
    const inserts = [msg_comment, post_id, user_id];
    console.log(inserts);
    connect.query( queryS, inserts, (err, results , fields) => {
        if (err) {
            res.status(404).send({
                message: err.message || "impossible to update comment !"
            }) 
        }else{
            console.log("result : ", results);
            res.status(200).json({ message: "Ok update comment !"});
            
        }
        
    })
}

//Supprimer un commentaire
exports.deleteOneComment = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests !"})}
    const query = req.params.id; console.log(query)
    const queryS = `DELETE FROM Comment WHERE id = ${query}`;
    connect.query(queryS,  (err, results, fields) => {
        if (err) { 
            console.log(err);
            res.status(404).send({
            message: err.message || "Impossible to delete comment  !"
            })
            return;
        }
        res.status(200).json({ message: "Ok comment delete!"});
        
    
    });
}
