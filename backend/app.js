const express = require('express');
// const bodyParser = require("body-parser");
const path = require('path');
const cookieSession = require("cookie-session");
const helmet = require("helmet");

//creer fichier env ds dossier P
// const dotenv = require('dotenv');
// dotenv.config({ path: './.env'});


//les routes
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

const app = express();


// methode de securité helmet


//Eviter les erreurs cors
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// securise session
app.use(
  cookieSession({
    name: "session",
    secret: "s3CuR3T3",
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "http://localhost:3000/",
    },
  })
);
  // app.use(bodyParser.json());
  app.use (express.urlencoded({extended: false})); // Analyser les corps encodés en URL
  app.use(express.json());

  
// traitetement d'image de maniere static
app.use("/images", express.static(path.join(__dirname, "images")));

// appel route
app.use(loginRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(likeRoutes);

module.exports = app;



module.exports = app;