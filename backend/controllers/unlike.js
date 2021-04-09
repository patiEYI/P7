const mysql = require("mysql");
const connect = require("../BDD/connect")

//creer unlike
exports.createUnlike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty request !"})}
    const  post_id = req.body.post_id;
    const  user_id = req.body.user_id;
    const inserts = [user_id ,post_id]
    const queryS = `INSERT INTO unlikes SET user_id = ? , post_id = ?`;

    connect.query(queryS, inserts, (err,results, fields) => {
        if (err) {console.log(err)
            res.status(404).send({
                message: err.message ||  "Impossible to create unlike !"
            }) 
        }else{
            res.status(200).json({ message: "Ok like created !"});
        
        }
    })
};

// Delete a Unlike with the specified unlikeId in the request
exports.deleteUnlike = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty request !"})}
    const query = req.params.id
    const queryS = "DELETE FROM unlikes WHERE id = ?";
    connect.query(queryS, query, (err, results) => {
        if (err) {console.log(err)
            res.status(404).send({
                message: err.message ||  "Impossible to delete unlike !"
            }) 
        }else{
            res.status(200).json({ message: "Ok unlike deleted !"});
        }
    })

}
//Tous les unlikes
  exports.findAllUnlikes = (req, res) => {
    connect.query("SELECT * FROM unlikes", (err,data) => {
        if (err) {
            res.status(404).send({
               message: err.message ||  "No unlike found !"
            })
          return;
        }
        res.send(data);
    });
  };