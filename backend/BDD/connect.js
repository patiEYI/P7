const mysql = require("mysql");

// connection a la bdd
const connect = mysql.createConnection({
  host: "localhost",
  user: "root" ,
  password: "" ,
  database: "groupomania",
});

//test dans la console
connect.connect(function(err) {

  if (err) throw err;

  console.log("Connect to MySQL database!");
 
});


module.exports = connect;

