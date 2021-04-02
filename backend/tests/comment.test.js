const mysql = require('mysql');
const connect  = require('../BDD/connect');
const comment = require("../controllers/comment")

//TEST trouver un user
test("Creation user, usage standard",  () => {
    const msg_comment=" comment";
    const post_id = 1; 
    const user_id = 76

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
    expect(comment.createComment(user.length)).toBe(results)
  

});

//Supprimer  un commentaire
test("sypprimer un comment, usage standard", () => {
  const id = 1;
  const query = 1;
    const queryS = "DELETE FROM Comment WHERE id = ?";
    connect.query(queryS, query, (err, results) => {
        if (err) { 
            console.log("error: ", err);
            result(err, null);
            res.status(404).send({
            message: err.message || " commentaire non supprimé !"
            })
            return;
        }else if (res.affectedRows == 0) {
            result({ kind: "not_found"}, null);
            return;
        }
        res.status(200).json({ message: "ok commentaire supprimé !"});
        console.log(" commentaire " ,results);
    
    });
    expect(comment.deleteAllComment()).toBe(results)


})

/

//Tous les commentaires
test("récupérer tous users usage standard", () => {
    const queryS = "SELECT * FROM comment";
    connect.query(queryS, (err,results) => {
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
    expect(comment.findAllComment()).toBe(results)

})