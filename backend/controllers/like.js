const mysql = require("mysql");
const connect = require("../BDD/connect")


//Creer un like
exports.createLike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    const  post_id = req.body.post_id;
    const  user_id = req.body.user_id; console.log(user_id);
    const inserts = [ user_id, post_id,]
    const queryS = `INSERT INTO nbr_like SET user_id = ? , post_id = ?`;
    connect.query(queryS, inserts, (err,results, fields) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: err.message || "impossible de liker !"
            }) 
        }else{
            res.status(200).json({ message: "ok like crée !"});
            console.log("La solution : ", results);
        }
    })
}

//Suprimer un like
exports.deleteLike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    const query = req.params.id
    const queryS = `DELETE FROM Nbr_like WHERE id = ${query}`;
    connect.query(queryS, (err, results) => {
        if (err) {console.log(err)
            res.status(404).json({
                message: err.message ||  "impossible de supprimer le like !"
            }) 
        }else{
            res.status(200).json({ message: "ok like supprimé !"});
            console.log("La solution : ", results);
        }
    })

}

//Trouver tous les likes
exports.findAllLikes = (req,res) => {
    connect.query("SELECT * FROM Nbr_like", (err, data, fields) => {
        if (err) {
            console.log("error: ", err);
            res.status(404).json({
            message: err.message ||  "Aucun like trouvé !"
            })
          return;
        }
        // console.log("like: ",data);
        res.send(data);
    });
}


  