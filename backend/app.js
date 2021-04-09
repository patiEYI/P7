const express = require('express');
const path = require('path');
const cookieSession = require("cookie-session");
const helmet = require("helmet");

// desactive le cache
const nocache = require("nocache");

//les routes
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

const app = express();

//Methode de securité helmet
app.use(helmet());

// Appel de fonction desactive cache
app.use(nocache());

//Eviter les erreurs cors
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

//Session
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

  app.use (express.urlencoded({extended: false})); //Analyser les corps encodés en URL
  app.use(express.json());

  
// Traitetement d'image de maniere static
app.use("/images", express.static(path.join(__dirname, "images")));

// appel route
app.use(loginRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(likeRoutes);

module.exports = app;
