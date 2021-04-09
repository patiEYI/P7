const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connect = require("../BDD/connect");
const mysql = require("mysql");

//knex pour faire faire des requetes sql asynchrone
const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "groupomania"
  }
});

// signup 
exports.signup = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);
    await db("user").insert({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      role: req.body.role,
      email: req.body.email,
      password: hash,
      image_url:null,
      
    })
    return res.status(200).json('Ok user created !');
  }catch (error) {
    if (error.errno === 1062) {
      res.status(400).json("Email must be unique!");
    } else console.log(error);
    res.status(500).send("Something brook !");
  }
};
      
   
//login
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(400).json("Email can't be empty !");
    }
    const user = await db("user").first("").where({ email: email });
    if (!user) {
      res.status(404).json("User no found!");
    }else{
      console.log(user);
      console.log(req.body.password); 

      const valid = await  bcrypt.compare(req.body.password , user.password);
      console.log(user.password);
      if (!valid) {
        return res.status(401).json({ err: 'Wrong password !' });
      }
      else if (valid){
        
        return res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });

      }
    }
 
  } catch (e) {
    res.status(400).json("Something brook!");
  }
};

// Modifier le mot de passe
exports.updatePassword = async (req, res) => {
  try {
    const email = req.body.email;
    
    if (!email) {
      res.status(400).json("Email can't be empty !");
    }
    
    const user = await db("user").first("").where({ email: email });
    console.log(email);

    if (!user) {
      res.status(404).json("User no found!");
    }else{ 

      const hash = await bcrypt.hash(req.body.password, 10);
      console.log(hash);
      await db("user").update({
        password: hash,  
      })
      return res.status(200).json({
       message:"Ok user update"
      });
    }
 
  } catch (e) {
    res.status(400).json("Something brook!");
  }    

}




