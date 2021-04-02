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

// signup
exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password ) {
      res.status(401).json(`${!email ? "email" : "password"} ne peut etre vide !`);
    }
    const hash = await bcrypt.hash(req.body.password, 10);
      const user = await db("user").insert({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      role: req.body.role,
      email: maskData.maskEmail2(req.body.email, emailMaskOptions),
      password: req.body.password,
      image_url:null,
      });
     
    return res.status(200).json(user);
  } catch (error) {
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
    const password = req.body.password;
  

    if (!email || !password) {
      res.status(400).json(` ${!email ? "email" : "password"} non trouvé !`);
    }

    const user = await db("user").first("*").where({ email: email });
    console.log(email);

    if (!user) {
      res.status(404).json("Utilisateur non trouvé!");
    }else{ 
    console.log(user);
    const valid = await bcrypt.compare(password , user.password.toString());
    console.log(valid);
    console.log(password)
    console.log(user.password);
    if (!valid){
      
      return res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )
      });

    }
      // const valid =  bcrypt.compare(password , user.password, () => {
       
      
       return res.status(401).json({ err: 'Mot de passe incorrect !' });
        
       
      

      // });
    }
 
  } catch (e) {
    res.status(400).json("Quelque chose s'est cassé !");
  }
};

// if (!user) {
//   res.status(404).json("Utilisateur non trouvé!");
// }else{ 
// console.log(user);
//   const valid =  bcrypt.compare(password , user.password.toString('utf-8'), () => {
//     console.log(password);
//     console.log(user.password.toString('utf-8'));
//     if (!valid) {
//       return res.status(401).json({ err: 'Mot de passe incorrect !' });
//     } 
//     return res.status(200).json({
//       userId: user.id,
//       token: jwt.sign(
//         { userId: user.id },
//         'RANDOM_TOKEN_SECRET',
//         { expiresIn: '24h' }
//       )
//     });
  

//   });
// }



