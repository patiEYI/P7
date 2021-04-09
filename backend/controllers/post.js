const mysql = require('mysql');
const connect  = require('../BDD/connect');
const fs = require('fs');  

//Creer un nouveau post
exports.createPosts = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests !"})}
    const description = req.body.description; 
    const image_url =  req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";
    const user_id = req.body.user_id
    const queryS = `INSERT INTO Post SET date = NOW() , description = ? , image_url  = ? , user_id = ? `;
    const inserts = [ description, image_url, user_id];
    connect.query(queryS,inserts, function (err, results, fields) {
        if (err) {
            res.status(404).send({
                message: err.message ||  "Impossible to create post!"    
            }) 
        }else{ 
            res.status(200).json({ message: results + "Ok post created !"});
                    
        }

    }); 
       
}

//Modifier un post
exports.updateOnePosts = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests !"})}
    const query = req.params.postId; 
    const description = req.body.description;
    const user_id = req.body.user_id; 
    const image_url =  req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";
    const inserts = [ description , image_url , user_id];
    const queryS =`UPDATE Post SET date = NOW() , description = ? ,image_url = ? , user_id = ?  WHERE post_id = ${query}`;
    connect.query(queryS, inserts, function (err, results, fields) {
        if (err) {
            res.status(404).send({
                message: err.message ||  "Impossible to update post !"  
            }) 
           
        } 
      
        res.status(200).json({ message: "Ok post update!"});
            
    }); 

   
}

//Récupérer tous les posts
exports.findAllPosts = (req, res) => {
     const { userId } = req.body; 
    const queryS = "SELECT post_id, date , CONCAT_WS(' ', DAY(date),'/',MONTH(date),'/', YEAR(date) , ' à: ', TIME(date)) AS date_post, description, image_url, user_id FROM Post";
    const inserts = [req.body.userId]
    
    connect.query( queryS ,inserts, function (err, data, fields) {
        if (err) {
            res.status(404).send({
                message: err.message || "No post found !"
            }) 
        }else{ 
            res.send(data)
            
        }

    });
    
    
} 

// //Récupérer un seul post
exports.findOnePosts = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests !"})}
     const query = req.params.postId;
    const queryS = `SELECT  post_id, date , CONCAT_WS(' ', DAY(date),'/',MONTH(date),'/', YEAR(date) , ' à: ', TIME(date)) AS date_post , description, image_url, user_id FROM post WHERE post_id = ${query} `;
    connect.query(queryS, function (err,  data, fields) {
        if (err) {
            res.status(404).send({
                message: err.message ||  "No post found !"
            }) 
        }
        else{ 
           
            res.send(data);
        }
    
    });
   
   
}


// //Suppimer un post
exports.deleteOnePosts = (req, res) => {
    if(!req.body) { res.status(400).json({ message: "Empty requests !"})}
    const query = req.params.postId;
    const queryS = `DELETE FROM Post WHERE post_id = ${query}` ;
     
    connect.query(`SELECT * FROM Post WHERE post_id = ${query}`, function(err, rows, fields) {
        
       if(err){
           res.status(500).json({err: err.message})
       }else if(rows[0].image_url){
            const filename = rows[0].image_url.split("/images/")[1];

            fs.unlink(`images/${filename}`, () => {
                connect.query(queryS , function (err, results,  fields) {
                    if (err) {
                        res.status(404).send({
                            message: err.message ||  "No post found  !"
                        }) 
                    }
                    res.status(200).json({ message: "Ok post deleted!"});   
                })
                
            });
        }else{  
            
            connect.query(queryS , function (err, results,  fields) {
                if (err) {
                    res.status(500).send({
                        message: err.message ||  "Something broke !"
                    }) 
                }
                res.status(200).json({ message: "Ok post deleted !"});
                
                
            })
        }
     
    });
    
    
}

// //Supprimer tous les post
exports.deleteAllPosts = (req, res) => {

    connect.query( "DELETE FROM post", function (err, results, fields) {
        if (err) {
            res.status(404).send({
                message: err.message || "No post to delete!"
            }) 
        }else{ 
            res.status(200).json({ message: "ALL post deleted  !"});
                
        }

    });
   
}
