const mysql = require("mysql");


// connection a la bdd
const connect = mysql.createConnection({
  host: "localhost",//process.env.DATABASE_HOST
  user: "root" , // process.env.DATABASE_USER,
  password: "" ,//process.env.DATABASE_PASSWORD,//
  database: "groupomania",//process.env.DATABASE
});

//test dans la console
connect.connect(function(err) {

  if (err) throw err;

  console.log("Connecté à la base de données MySQL!");
 
});


module.exports = connect;

