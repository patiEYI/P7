const mysql = require("mysql");
const connect = require("../BDD/connect")


//Creer un like
exports.createLike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests!"})}
    const  post_id = req.body.post_id;
    const  user_id = req.body.user_id; console.log(user_id);
    const inserts = [ user_id, post_id,]
    const queryS = `INSERT INTO nbr_like SET user_id = ? , post_id = ?`;
    connect.query(queryS, inserts, (err,results, fields) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: err.message || "impossible to like !"
            }) 
        }else{
            res.status(200).json({ message: "Like created!"});
            
        }
    })
}

//Suprimer un like
exports.deleteLike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests  !"})}
    const query = req.params.id
    const queryS = `DELETE FROM Nbr_like WHERE id = ${query}`;
    connect.query(queryS, (err, results) => {
        if (err) {console.log(err)
            res.status(404).json({
                message: err.message ||  "impossible to delete like !"
            }) 
        }else{
            res.status(200).json({ message: "Ok like deleted!"});
    
        }
    })

}

//Trouver tous les likes
exports.findAllLikes = (req,res) => {
    connect.query("SELECT * FROM Nbr_like", (err, data, fields) => {
        if (err) {
            console.log("error: ", err);
            res.status(404).json({
            message: err.message ||  "No like found !"
            })
          return;
        }
        res.send(data);
    });
}


  