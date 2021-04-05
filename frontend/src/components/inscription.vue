<template>
<!-- Création d'un utilisateur -->
   <section id="signup" class="color col-lg-6 col-md-6 mx-auto text-center shadow-lg border border-primary rounded-lg mt-5">
       <h1 class="dissplay-5"> Groupomania </h1>
       <div class="text-white">
            <form   @submit="checkForm" id="signup" action="" method="post" class="needs-validation ">
               <p v-if="errors.length" class="text-warning">
                    <ul>
                    <li v-for="error 
                    in errors" v-bind:key="error" >{{ error }}</li>
                    </ul>
                </p>
                <div class="form-group col ">
                    <label for="lastname"></label>
                    <input class="form-control color pl-5 p-4 " 
                    name="lastname" type="text"
                    v-model.trim="lastname"
                    placeholder="Lastname" required/>
                    <i class="fa fa fa-user fa-fw " ></i>
                </div>
                <div class="form-group col">
                    <label for="firstname"></label>
                    <input class="form-control color pl-5 p-4" 
                    name="firstname" type="text"
                    v-model.trim="firstname"
                    placeholder="firstname" required/>
                    <i class="fa fa fa-user fa-fw " aria-hidden="true"></i>
                </div>
                <div class="form-group col">
                    <label for="role"></label>
                    <input class="form-control color pl-5 p-4" 
                    name="role" type="text"
                    v-model.trim="role"
                    placeholder="role" required/>
                    <i class="fa fa fa-suitcase fa-fw " aria-hidden="true"></i>
                    <p class="misstext"></p>
                </div>
                <div class="form-group col">
                    <label for="email"></label>
                    <input class="form-control color pl-5 p-4" 
                    name="email" type="email" v-model.trim="email" placeholder="email" required/>
                    <i class="fa fa fa-at fas-fw" aria-hidden="true"></i>
                    <p class="misstext"></p>
                </div>
                <div class="form-group col">
                    <label for="password"></label>
                    <input class="form-control color pl-5 p-4" v-model.trim="password"
                    name="password" type="password" placeholder="password" required/>
                    <i class="fa fa fa-lock fa-fw " aria-hidden="true"></i>
                    <p class="misstext"></p>
                </div>
               <button class="sub_btn color col-lg-4 col-7 text-white m-5 shadow-lg" type="submit">  S'inscrire </button>
            </form>
        </div>
       <p class="connexion  text-center"> Avez vous déja un compte ? <router-link to="/" > Se connecter </router-link></p>
    </section>
</template>

<script>
import axios from "axios";
export default {
   name: 'inscription',
   data () {
       return {
        errors:[],
        lastname: null,
        firstname: null,
        role: null, 
        email: null,
        password: null,
        }
    },
   
    methods:{
        checkForm: function (e) {
            //regex 
           const regex = /^[A-Z][A-Za-z(éèêà)]+$/
            //Regex password un maj, un chiffre, un caractère spécial, min:8, max:15
            const regexP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/;

            this.errors = [];
            if (!regex.test(this.lastname) || 
            !regex.test(this.firstname) || 
            !regex.test(this.role)) {
                this.errors.push('Format incorrect, certains caractères ne sont pas autorisé !');
            }
            else if (!this.email) {
                this.errors.push('email required.');

            }else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required.');
                }
            else if (!regexP.test(this.password)){
                this.errors.push('Le mot de passe doit avoir un majuscule, un chiffre, un carcartère spéciale(8 caractères min).');
            }else if (this.errors.length === 0) { 
                axios.post('http://localhost:3000/signup', {
                    lastname: this.lastname,
                    firstname: this.firstname,
                    role: this.role,
                    email: this.email,
                    password: this.password 
                    })
                    .catch((error) => {  
                        this.errors = [];
                        if (error) {
                            this.errors.push(error);
                        }
                    })
                    .then((response) => {
                            if (!this.errors.length){ 
                            alert("Votre compte à été bien créer !")   
                            this.$router.push("/")
                        }
                        console.log(response)
                    })
                    .catch((error) => (console.log(error)))

                    e.preventDefault();
                }
            }, 
            validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
    },        
}
</script>
<style scoped lang="scss">
form {
  padding-bottom: 20%;
  padding-top: 20%;
  input{
    border-radius: 2rem;
    background-color: #01215E; 
    }
}
i {
  position: absolute; left: 2rem; top: 2.3rem;
  font-size: 1.4rem;
  color: #fff;
}
</style>