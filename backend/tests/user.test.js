const mysql = require('mysql');
const connect  = require('../BDD/connect');
const users = require("../controllers/users")

/

//Modifier un user
test("modifier un user, usage standard", () => {
  const id = 1;
  const lastname = "Mon reve ";
  const firstname = "Mon reve ";
  const role = "Mon reve ";
  const image_url = "http://reve.com/vacation.jpg";

    const queryS = `UPDATE User SET lastname = ?, firstname = ?, role = ?, image_url =? WHERE id =${id} `;
    const inserts = [lastname, firstname, role, image_url, id];
   if (inserts) {
        connect.query(queryS, inserts, function (err, data, fields) {
            if (err) {
                res.status(404).send({
                    message: err.message ||  "Aucun utilisateur trouvé !"
                }) 
            }else{ 
                return results;
                
            }

        }); 
    }
    expect(users.updateOneUser()).toBe(results)


})

//recupérér un user
test("récupérer un user, usage standard", () => {
    const userId = 2;
    const queryS = `SELECT * FROM User WHERE id = ?` ;//${req.body.userId}
    const inserts = [userId,post_id]
   
        connect.query(queryS,inserts,  function (err, results, fields) {
            if (err) {
                res.status(404).send({
                    message: err.message ||  "Aucun utilisateur trouvé !"
                }) 
            }else{ 
                return results;
            }
    
        });
    expect(users.findOneUser()).toBe(results)
})

//Tous les users
test("récupérer tous users usage standard", () => {
    connect.query( "SELECT * FROM User", function (err, results, fields) {
        if (err) { if (err) throw err;
        }else{ 
            return results;
            }
    
        })
    // expect(users.findAllUsers()).toBe(results)
})
