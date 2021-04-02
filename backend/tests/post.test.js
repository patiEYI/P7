const mysql = require('mysql');
const connect  = require('../BDD/connect');
const post = require("../controllers/post")

//TEST creation du post
test("Creation post, usage standard",  () => {
    const description = "olala";
    const image_url = "image";
    const nbr_like = 1;
    const comment_id = 1;
    const user_id = 1;
   
  
    expect(post.createPosts()).toBe(results)

});

//Modifier un post
test("modifier un post, usage standard", () => {
    
  const description = "Mon reve se realise";
  const image_url = "http://reve.com/vacation.jpg";
  const post_id = 1;

  const queryS =  `UPDATE Post SET date = NOW(), description = ?, image_url  = ? WHERE post_id = ${post_id}`;
  const data = [description, image_url,post_id];
 
  connect.query(queryS, data, function (err, results, fields) {
    if (err) throw err;
    return results;
  });
  expect(post.updateOnePosts()).toBe(results)

})

//recupérér un post
test("récupérer un post, usage standard", () => {
    const userId = 2;
    const post_id = 1;
    if (userId) {
         const queryS =  `SELECT * FROM Post WHERE post_id =${post_id}`; 
        connect.query(queryS,  function (err, results, fields) {
            if (err) throw err;
            return results;
        });
   }
   expect(post.findOnePosts()).toBe(results)

})

//Tous post
test("récupérer un post, usage standard", () => {
    const description = 'tres jolie vraiment nice';
    const image_url = "http://images.nike.com/is/image/emea/PDP_HERO/Nike-Roshe-Run-Print-Womens-Shoe-599432_674_A_PREM.jpg";
    const nbr_like = 1;
    const user_id = 4;
    const comment_id = 1;
    
    
     const queryS =   `INSERT INTO Post SET  date = NOW(), description = ?, image_url  = ?, nbr_like = ?, user_id = ?, comment_id = ? `;
     const data = [,description, image_url, nbr_like, user_id, comment_id];
    
    connect.query(queryS, data,function (err, results, fields) {
        if (err) throw err;
        return results;
    });
    expect(post.findAllPosts()).toBe(results)

})
