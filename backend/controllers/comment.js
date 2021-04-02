const mysql = require("mysql");
const connect  = require('../BDD/connect');

//Crée un commentaire
exports.createComment = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}

    const msg_comment= req.body.comment;
    const post_id = req.body.post_id; 
    const user_id = req.body.user_id

    const queryS = `INSERT INTO Comment SET date = NOW() , msg_comment = ? , post_id = ? , user_id = ? `;
    const inserts = [msg_comment, post_id, user_id]
    connect.query( queryS, inserts, (err, results , fields) => {
        if (err) {
            res.status(404).send({
                message: err.message ||  "impossible de créér un commentiare !"
            }) 
        }else{
            res.status(200).json({ message: "ok commentaire crée !"});
            console.log("La solution : ", results);
        }
        
    })
    
}

//Récupérer tous les commentaires
exports.findAllComment = (req, res) => {
    const queryS =  "SELECT id , date , CONCAT_WS(' ', DAY(date),'/',MONTH(date),'/', YEAR(date) , ' à: ', TIME(date)) AS date_comment, msg_comment, post_id, user_id FROM Comment";
    connect.query(queryS, (err, data, results, fields) => {
        if (err) { 
            console.log("error: ", err);
            result(err, null);
            res.status(404).send({
            message: err.message || "Aucun commentaire trouvé !"
            })
            return;
        }
        console.log("La solution : ", results);
        res.send(data)
    }) 
}

//Trouver un seul commentaire
// exports.findOneComment = (req, res) => {
//     Comment.findById(req.params.id, (err, data) => {
//         if (err) {
//             if(err.kind === "not_found") { res.status(404).json({
//                 message: "Commentaire non trouvé !"
//             })
//             }else{ res.status(500).json({ message: "Something wrong !"})}
//         }else{ res.send(data)};
//     })
// }

//Modifier un commentaire
exports.updateOneComment = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    const query = req.params.id; console.log(query);
    const msg_comment= req.body.comment;
    const post_id = req.body.post_id; 
    const user_id = req.body.user_id

    const queryS = `UPDATE Comment SET date = NOW(), msg_comment = ? , post_id = ? , user_id = ? WHERE id = ${query}`;//
    const inserts = [msg_comment, post_id, user_id];
    console.log(inserts);
    connect.query( queryS, inserts, (err, results , fields) => {
        if (err) {
            res.status(404).send({
                message: err.message || "impossible de modifier le commentiare !"
            }) 
        }else{
            console.log("La solution : ", results);
            res.status(200).json({ message: "ok commentaire modifié !"});
            
        }
        
})
}

//Supprimer un commentaire
exports.deleteOneComment = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    const query = req.params.id; console.log(query)
    const queryS = `DELETE FROM comment WHERE id = ${query}`;
    connect.query(queryS,  (err, results, fields) => {
        if (err) { 
            console.log(err);
            res.status(404).send({
            message: err.message || " commentaire non supprimé !"
            })
            return;
        }
        res.status(200).json({ message: "ok commentaire supprimé !"});
        console.log(" commentaire " ,results);
    
    });
}

//Supprimer tous les commentaires
exports.deleteAllComment = (req, res) => {
    Comment.deleteAll((err) => {
        if (err) { res.status(500).json({ message: err.message})}
        else res.send({ message: "Tous les commentaires sont supprimé !"});
    })
}