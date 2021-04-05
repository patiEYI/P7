const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connect = require("../BDD/connect");
const mysql = require("mysql");
const maskData = require("maskdata");

// Methode masquage email
const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 2,
  unmaskedEndCharactersAfterAt: 1,
  maskAtTheRate: false,
};

//knex pour faire faire des requetes sql asynchrone
const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "groupomania"
  },
});

// signup const hash =
exports.signup = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);
    await db("user").insert({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      role: req.body.role,
      email: maskData.maskEmail2(req.body.email, emailMaskOptions),
      password: hash,
      image_url:null,
      
    })
    return res.status(200).json('Ok utilisateur créer !');
  }catch (error) {
    if (error.errno === 1062) {
      res.status(400).json("L'email doit etre unique!");
    } else console.log(error);
    res.status(500).send("Quelque chose s'est cassé1 !");
  }
};
      
   
//login
exports.login = async (req, res, next) => {
  try {
    const email = maskData.maskEmail2(req.body.email, emailMaskOptions);
    
    if (!email) {
      res.status(400).json("L'email est requise !");
    }
    
    const user = await db("user").first("*").where({ email: email });
    console.log(email);
    console.log(req.body.password);

    if (!user) {
      res.status(404).json("Utilisateur non trouvé!");
    }else{ 

      const valid = await  bcrypt.compare(req.body.password , user.password);
      console.log(user.password);
      if (!valid) {
        return res.status(401).json({ err: 'Mot de passe incorrect !' });
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
    res.status(400).json("Quelque chose s'est cassé !");
  }
};

// Modifier mot de passe
exports.updatePassword = async (req, res) => {
  try {
    const email = maskData.maskEmail2(req.body.email, emailMaskOptions);
    
    if (!email) {
      res.status(400).json("L'email est requise !");
    }
    
    const user = await db("user").first("*").where({ email: email });
    console.log(email);

    if (!user) {
      res.status(404).json("Utilisateur non trouvé!");
    }else{ 

      const hash = await bcrypt.hash(req.body.password, 10);
      console.log(hash);
      await db("user").update({
        password: hash,  
      })
      return res.status(200).json({
       message:"Mot de passe modifier"
      });
    }
 
  } catch (e) {
    res.status(400).json("Quelque chose s'est cassé !");
  }    

}




