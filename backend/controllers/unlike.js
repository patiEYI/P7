const mysql = require("mysql");
const connect = require("../BDD/connect")

//creer unlike
exports.createUnlike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    const  post_id = req.body.post_id;
    const  user_id = req.body.user_id;
    const inserts = [user_id ,post_id]
    const queryS = `INSERT INTO unlikes SET user_id = ? , post_id = ?`;

    connect.query(queryS, inserts, (err,results, fields) => {
        if (err) {console.log(err)
            res.status(404).send({
                message: err.message ||  "impossible de créer le unlike !"
            }) 
        }else{
            res.status(200).json({ message: "ok unlike crée !"});
            console.log("La solution : ", results);
        }
    })
};

  // Delete a Unlike with the specified unlikeId in the request
exports.deleteUnlike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "requete vide !"})}
    const query = req.params.id
    const queryS = "DELETE FROM unlikes WHERE id = ?";
    connect.query(queryS, query, (err, results) => {
        if (err) {console.log(err)
            res.status(404).send({
                message: err.message ||  "impossible de supprimer unlike !"
            }) 
        }else{
            res.status(200).json({ message: "ok unlike supprimé !"});
            console.log("La solution : ", results);
        }
    })

}
//tous les unlikes
  exports.findAllUnlikes = (req, res) => {
    connect.query("SELECT * FROM unlikes", (err,data) => {
        if (err) {
            console.log("error: ", err);
            res.status(404).send({
               message: err.message ||  "Aucun unlike trouvé !"
            })
          return;
        }
        console.log("unlike: ", data);
        res.send(data);
    });
  };