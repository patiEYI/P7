
const login = require("../controllers/login")
const db = require("knex")({
     client: "mysql",
     connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "groupomania"
    },
  });


const user = {
    userId: 1,
    lastname: "john",
    firstname: "gave",
    role: "DG",
    email: "test@gmail.com",
    password: "valid",
}

//signup//
test("Creation user, usage standard",  () => {

    const user =  db("user").insert({
        lastname: "lastname",
        firstname: "firstname",
        role: "role",
        email: "pas@gmail.com",
        password: "" ,
        image_url:"PassValid",
        });
        if (err) throw err;
       
    expect(login.signup(user.lastname, user.firstname, user.email, user.password)).toBe("john", "gave", "DG", "test@gmail.com","pass")

});

test("Si un des champs est manquant",  () => {
    const user =  db("user").insert({
        lastname: "lastname",
        firstname: "firstname",
     
        email: "pas@gmail.com",
        password: "" ,
        image_url:"PassValid",
        });
        if (err) throw err;
    expect(login.signup(user.length)).toBe(5)
   console.log("Tout les champs sont requis !");

});

test("Si le mot de passe est trop faible ",  () => {
    const user =  db("user").insert({
        lastname: "lastname",
        firstname: "firstname",
        role: "role",
        email: "pas@gmail.com",
        password: "" ,
        image_url:"alid",
        });
        if (err) throw err;
    expect(login.signup(user.password) ).toBe("Test0+valid")
    console.log("Le mot passe doit avoir 1majuscule ,un chiffre , un caractère spécial(max: 15 min:8!");

})

test("Si le format d' email incorect",  () => {
    const user =  db("user").insert({
        lastname: "lastname",
        firstname: "firstname",
        role: "role",
        email: "pas@gmail",
        password: "" ,
        image_url:"PassValid",
        });
        if (err) throw err;
    expect(login.signup(user.email)).toBe("test@gmail.com")
    console.log("Format d'email incorect ! ex d'email valid: test@gmail.com");

})

test("Si email déja utilisé",  () => {
    http.post('http://localhost:3000/signup', {
        lastname: "lastname",
        firstname: "firstname",
        role: "role",
        email: "pas@gmail.com",
        password: "" ,
        image_url:"PassValid",
     })
    expect(login.login(user.email)).notToBe("test@gmail.com")
    console.log("L'email doit etre unique");

})


